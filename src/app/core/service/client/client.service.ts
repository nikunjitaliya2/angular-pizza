import {Injectable} from '@angular/core';
import {environment} from "../../../../environment/environment";
import {catchError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AuthHeader} from "../auth.header";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private httpClient: HttpClient,
    private headerService: AuthHeader
  ) {
  }

  getOrders(id: string) {
    return this.httpClient.get(`${environment.BaseUrl}/orders/${id}`, this.headerService.setHeaders()).pipe(catchError(this.headerService.errorHandler));
  }

  getAllCustomerOrder() {
    return this.httpClient.get(`${environment.BaseUrl}/orders`, this.headerService.setHeaders()).pipe(catchError(this.headerService.errorHandler));
  }

  changeOrderStatus(data : any , id: string){
    return this.httpClient.put(`${environment.BaseUrl}/orders/${id}`,data, this.headerService.setHeaders()).pipe(catchError(this.headerService.errorHandler))
  }

  getOrdersByOrderId(id: string) {
    return this.httpClient.get(`${environment.BaseUrl}/orders/tracking/${id}`, this.headerService.setHeaders()).pipe(catchError(this.headerService.errorHandler));
  }

}
