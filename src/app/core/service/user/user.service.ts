import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private httpClient:HttpClient
  ) { }

  login(data:any){
    return this.httpClient.post(`${environment.BaseUrl}/users/login`,data);
  }

  register(data: object){
    return this.httpClient.post(`${environment.BaseUrl}/users/register`,data);
  }
}
