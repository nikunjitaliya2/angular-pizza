import {Component, OnInit} from '@angular/core';
import {ClientService} from "../../core/service/client/client.service";
import * as moment from "moment";

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  now = moment
  allOrderDetails: any

  constructor(private clientService: ClientService) {
  }

  ngOnInit() {
    this.clientService.getAllCustomerOrder().subscribe({
      next: (res) => {
        this.allOrderDetails = res
      },
      error: (err) => {
        console.log("res", err)
      }
    })
  }

}
