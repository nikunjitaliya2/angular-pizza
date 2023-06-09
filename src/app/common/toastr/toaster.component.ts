import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ToastService} from "../../core/service/toast.service";

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
  animations: [
    trigger('toastTrigger', [
      state('open', style({ transform: 'translateY(0%)' })),
      state('close', style({ transform: 'translateY(-200%)' })),
      transition('open <=> close', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class ToasterComponent implements OnInit{
  toastClass: string[] = [];
  toastMessage: string = '';
  showsToast: boolean = false;

  constructor(public toast: ToastService ) { }

  ngOnInit(): void {
      this.showsToast = true;
  }
  dismiss(): void {
    this.toast.close()
  }
}
