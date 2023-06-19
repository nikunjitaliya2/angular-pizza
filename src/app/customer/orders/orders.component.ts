import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {ClientService} from "../../core/service/client/client.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  userDetails = JSON.parse(<string>localStorage.getItem('user-details'))
  customerOrders: any;

  constructor(
    private clientService: ClientService,
    private router: Router
  ) {


  }
  ngOnInit(): void {
    this.getAllOrder()
  }


  getAllOrder() {
    this.clientService.getOrders(this.userDetails._id).subscribe(
      (res) => {
        this.customerOrders = res
      },
      (err) => {
        console.log('err', err)
      }
    )
  }

  singleOrder(details: any) {
    localStorage.setItem('order-details', JSON.stringify(details))
    this.router.navigate([`/cart/orders/${details._id}`])
  }
  getMoment(time: string) {
    return moment(time).format('hh:mm A')
  }
}
