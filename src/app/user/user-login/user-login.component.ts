import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from "../../core/service/user/user.service";
import {TOAST_STATE, ToastService} from "../../core/service/toast.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  myForm: FormGroup | any;
  loginData: object = {};

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toast: ToastService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.userService.login(this.myForm.value).subscribe(
        (response: any) => {
          this.loginData = response;
          localStorage.setItem('pizza-jwt-token',response.token);
          console.log(response.token)
          this.router.navigate(['/'])
          this.myForm.reset();
        },
        (error) => {
          console.log(error);
          this.toast.showToast(
            TOAST_STATE.danger,
            error.error.message);
        }
      )
    }
  }
}



