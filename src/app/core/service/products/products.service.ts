import { Injectable } from '@angular/core';
import {environment} from "../../../../environment/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) {
  }
  getAllMenus(data: any = []){
    return this.httpClient.post(`${environment.BaseUrl}/menus`, data);
  }
}
