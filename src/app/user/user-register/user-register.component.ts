import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {UserService} from "../../core/service/user/user.service";
import {TOAST_STATE, ToastService} from "../../core/service/toast.service";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  register: FormGroup | any;
  constructor(private formBuilder : FormBuilder, private httpService : UserService, private  router: Router, private toast: ToastService) {
  }

  ngOnInit(): void {
    this.register = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

  }

  onSubmit() {
    if(this.register.valid){
      this.httpService.register(this.register.value).subscribe(
        (res) => {
          this.toast.showToast(
            TOAST_STATE.success,
            'You have successfully registered!');
          this.toast.dismiss()
          this.router.navigateByUrl('/auth/login')
        },
        (error) => {
          this.toast.showToast(
            TOAST_STATE.danger,
            error.error.message);
        }
      )
    }
  }

}
