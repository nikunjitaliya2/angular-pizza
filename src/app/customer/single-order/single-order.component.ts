import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import * as moment from "moment";
import {ClientService} from "../../core/service/client/client.service";
import {Socket} from "ngx-socket-io";

@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.css']
})
export class SingleOrderComponent implements OnInit, OnDestroy {
  currentOrderId: string = ''
  isCancelled: boolean = false
  statusChange: any;
  order: any = null

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private socket: Socket
  ) {

  }


  ngOnInit() {
    this.socket.connect();

    this.currentOrderId = this.route.snapshot.params['id'];
    if (this.currentOrderId) {
      this.getAllOrder(this.currentOrderId)
      this.socket.emit('join', this.currentOrderId)
    }
    this.socket.on('orderUpdated', (data: any) => {
      if (this.currentOrderId === data._id) {
        this.order.status = data.status
        this.checkOnClick(this.order)
      }
    });

  }

  getAllOrder(id: string) {
    this.clientService.getOrdersByOrderId(id).subscribe(
      (res) => {
        this.order = res
        console.log('res',res)
        this.checkOnClick(res)
      },
      (err) => {
        console.log('err', err)
      }
    );
  }



  getMoment(time: string) {
    return moment(time).format('hh:mm A')
  }

  checkOnClick(orderDetails: any) {
    let stepCompleted = true;
    let statusElements = document.querySelectorAll('.status_line');
    statusElements.forEach((status, index) => {
      let dataProp = status.getAttribute('dataStatus');
      if (stepCompleted) {
        status.classList.add('step-completed');
        if (dataProp === orderDetails.status) {
          stepCompleted = false;
          let nextSibling = statusElements[index];
          if (nextSibling) {
            nextSibling.classList.add('current');
          }
        }
        if (orderDetails.status === 'CANCELLED') {
          console.log(orderDetails.status)
          this.isCancelled = true
        }
      }
    });
  }


  ngOnDestroy() {
    localStorage.removeItem('order-details')
    this.socket.disconnect();
  }
}
