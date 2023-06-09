import { Injectable } from '@angular/core';
import {environment} from "../../../../environment/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) {
  }
  getAllMenus(){
    return this.httpClient.get(`${environment.BaseUrl}/menus`);
  }
}
