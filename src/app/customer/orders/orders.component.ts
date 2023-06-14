import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {ClientService} from "../../core/service/client/client.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  now = moment
  userDetails = JSON.parse(<string>localStorage.getItem('user-details'))
  customerOrders: any;

  constructor(private clientService: ClientService) {
    // this.now = moment(order.createdAt).format('hh:mm A'); // add this 2 of 4
    // console.log('hello world', this.now.format()); // add this 3 of 4
    // console.log(this.now.add(7, 'days').format());

  }
  ngOnInit(): void {
    console.log('userDetails',this.userDetails)
    this.clientService.getOrders(this.userDetails._id).subscribe(
      (res) => {
        this.customerOrders = res
      },
      (err) => {
        console.log('err', err)
      }
    )
  }


  getAllOrder() {

  }


}
