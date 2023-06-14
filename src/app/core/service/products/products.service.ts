import { Injectable } from '@angular/core';
import {environment} from "../../../../environment/environment";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs";
import {AuthHeader} from "../auth.header";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private httpClient: HttpClient,
    private headerService : AuthHeader
  ) {
  }
  getAllMenus(data: any = []){
    return this.httpClient.post(`${environment.BaseUrl}/menus`, data);
  }
  createOrder(data : any){
    return this.httpClient.post(`${environment.BaseUrl}/orders`, data, this.headerService.setHeaders() ).pipe(catchError(this.headerService.errorHandler));
  }
}
