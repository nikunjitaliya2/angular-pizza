import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() {
  }
  receive : any = {};
  sendOrderDetails(data: Object){
   return this.receive = data;
  }
}
