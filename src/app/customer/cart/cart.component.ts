import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProductsService} from "../../core/service/products/products.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TOAST_STATE, ToastService} from "../../core/service/toast.service";
import {IUser} from "../../interfaces/interface";
import {Socket} from "ngx-socket-io";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  availableCart: any[]
  products: any[] = []
  userContact: FormGroup | any;
  quantity: number = 1
  totalCost = 0;
  UserDetails = JSON.parse(<string>localStorage.getItem('user-details'))
  OrderDetails =
    {
      customerId: '',
      items: this.products,
      address: '',
      phone: 0,
      paymentType: 'COD',
      paymentStatus: false,
    }

  constructor(
    private router: Router,
    private productsService: ProductsService,
    private formBuilder: FormBuilder,
    private toast: ToastService,
    private socket: Socket
  ) {
    this.availableCart = <string[]>JSON.parse(<string>localStorage.getItem('cart')) || []
  }

  ngOnInit(): void {
    this.allCart()
    this.userContact = this.formBuilder.group({
      address: new FormControl('', [Validators.required]),
      phone: new FormControl('',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('[0-9]{10,}')]),
      paymentType: new FormControl('', [Validators.required])
    });
  }

  totalCostFn() {
    this.totalCost = this.products.reduce((acc, obj) => acc + obj.price, 0)
  }

  allCart() {
    if (this.availableCart.length !== 0) {
      this.productsService.getAllMenus(this.availableCart).subscribe(
        (res: any) => {
          this.availableCart.forEach((item: any) => {
            res.filter((element: any) => {
              if (element._id === item) {
                this.products.push({...element, quantity: 1})
                this.totalCostFn()
              }
            })
          });
        },
        (err) => {
          console.log(err)
        }
      )
    } else {

    }
  }

  orderNow() {
    if (this.UserDetails) {
      const items = this.saveOrderDetails(this.UserDetails);
      if (this.UserDetails.role === 'customer') {
        this.productsService.createOrder(items).subscribe(
          (res) => {
            this.toast.showToast(
              TOAST_STATE.success,
              'Order Is Successfully Placed');
            this.toast.dismiss()
            this.router.navigate(['/cart/orders'])
            console.log('res,res', res)
            localStorage.removeItem('cart')
          },
          (err) => {
            console.log('err', err)
          });
      } else {
        this.toast.showToast(
          TOAST_STATE.success,
          'Role Must be Customer');
        this.toast.dismiss()
        this.router.navigate(['/admin/orders'])
      }
    } else {
      this.toast.showToast(
        TOAST_STATE.success,
        'Going to Login First');
      this.toast.dismiss()
      this.router.navigate(['/auth/login'])
    }
  }


  saveOrderDetails(UserDetails: IUser) {

    this.OrderDetails.customerId = this.UserDetails._id;
    this.OrderDetails.items = this.products;
    this.OrderDetails.paymentType = this.userContact.value.paymentType;
    this.OrderDetails.paymentStatus = false;
    this.OrderDetails.phone = this.userContact.value.phone
    this.OrderDetails.address = this.userContact.value.address

    return this.OrderDetails
  }


  TotalQuantity(operator: string, id: string) {
    const item = this.products.find(item => item._id === id);

    if (item) {
      if (!item.quantity) {
        item.quantity = 0;
      }

      if (operator === '-' && item.quantity >= 1) {
        --item.quantity;
      }

      if (operator === '+') {
        ++item.quantity;
      }

      this.totalCost = this.products.reduce((acc, obj) => acc + (obj.price * obj.quantity), 0)
    }
  }

  removeCart(data: any, id: string) {
    const newArr = [...this.products];
    const newCartArr = newArr.filter((el) => el._id !== id);
    const index = newArr.findIndex((el: { _id: string; }) => el._id === id)
    newArr.splice(index, 1, ...newCartArr);
    this.products = newCartArr;
    console.log('remove', this.products)
    this.menuRemoveToLocal(data._id)
    this.totalCostFn()
  }

  menuRemoveToLocal(id: string) {
    const newArr = [...this.availableCart];
    const newCartArr = newArr.filter((el) => el !== id);
    this.availableCart = newCartArr

    localStorage.setItem('cart', JSON.stringify(newCartArr));
  }

  back() {
    this.router.navigateByUrl('/')
  }
}
