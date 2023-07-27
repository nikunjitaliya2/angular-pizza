import {Component, OnInit} from '@angular/core';
import {ClientService} from "../../core/service/client/client.service";
import * as moment from "moment";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Socket} from "ngx-socket-io";
import {TOAST_STATE, ToastService} from "../../core/service/toast.service";

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
    private socket: Socket,
    private toast : ToastService
  ) {
  }

  ngOnInit() {
    this.socket.connect();
    this.allCustomersOrders()
    this.orderStatus = this.formBuilder.group({
      status: new FormControl('', [Validators.required])
    });

    // Handle Socket.IO events
    this.socket.on('orderPlaced', (data: any) => {
      // Handle the received data
      console.log('Received data:', data);
      this.allCustomersOrders()
    });
  }
  statusUpdate = [
    {value: 'ORDER_PLACE', label: "Order Placed"},
    {value: 'ORDER_CONFIRM', label: "Order Confirm" },
    {value: 'PREPARATION' , label: "Preparation" },
    {value: 'OUT_FOR_DELIVERY', label: "Out For Delivery"  },
    {value: 'COMPLETED' , label: "Completed" },
    {value: 'CANCELLED', label: "Cancelled"  }
  ];

  onStatusChange( value: string, orderId: string) {
    if (orderId){
      let orderDetails : object = {
        status : value
      }
      this.clientService.changeOrderStatus(orderDetails,orderId).subscribe(
      (res) => {
        this.toast.showToast(
          TOAST_STATE.success,
          value.replace(/_/g, ' ').toLowerCase());
        this.toast.dismiss()
      },
      (err) =>{
        this.toast.showToast(
          TOAST_STATE.danger,
          err);
        this.toast.dismiss()
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
