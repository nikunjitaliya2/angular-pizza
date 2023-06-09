import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

export const TOAST_STATE = {
  success: 'success-toast',
  warning: 'warning-toast',
  danger: 'danger-toast'
};

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public showsToast$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public toastMessage$: BehaviorSubject<string> = new BehaviorSubject<string>('Default Toast Message');

  public toastState$: BehaviorSubject<string> = new BehaviorSubject<string>(TOAST_STATE.success);


  constructor() {
  }

  showToast(toastState: string, toastMsg: string): void {
    this.toastState$.next(toastState);

    this.toastMessage$.next(toastMsg);

    this.showsToast$.next(true);

  }

  close() {
    this.showsToast$.next(false);
  }

  dismiss() {
    setTimeout(() => {
      this.showsToast$.next(false);
    }, 3000)
  }
}
