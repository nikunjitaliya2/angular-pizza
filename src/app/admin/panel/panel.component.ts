import {Component, OnInit} from '@angular/core';
import {ClientService} from "../../core/service/client/client.service";
import * as moment from "moment";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Socket} from "ngx-socket-io";

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  allOrderDetails: any
  orderStatus: FormControl | any

  constructor(
    private clientService: ClientService,
    private formBuilder: FormBuilder,
    private socket: Socket
  ) {
  }

  ngOnInit() {
    this.allCustomersOrders()
    this.orderStatus = this.formBuilder.group({
      status: new FormControl('', [Validators.required])
    });

    // Handle Socket.IO events
    this.socket.on('join', (data: any) => {
      // Handle the received data
      console.log('Received data:', data);
    });
  }

  changeOrderStatus(orderId: string) {
    if (orderId){
      let orderDetails : object = {
        status : this.orderStatus.value.status
      }
      this.clientService.changeOrderStatus(orderDetails,orderId).subscribe(
      (res) => {
        console.log('response',res)
        // this.socket.emit('orderUpdated', orderId);
      },
      (err) =>{
        console.log('error',err)
      })
    }
  }

  allCustomersOrders() {
    this.clientService.getAllCustomerOrder().subscribe({
      next: (res) => {
        this.allOrderDetails = res
      },
      error: (err) => {
        console.log("res", err)
      }
    })
  }

  getMoment(time: string) {
    return moment(time).format('hh:mm A')
  }
}
