import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProductsService} from "../../core/service/products/products.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TOAST_STATE, ToastService} from "../../core/service/toast.service";
import {IUser} from "../../interfaces/interface";

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
      address: '',
      phone: 0,
      paymentType: 'COD',
      paymentStatus: false,
    }

  constructor(
    private router: Router,
    private productsService: ProductsService,
    private formBuilder: FormBuilder,
    private toast: ToastService
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

    if (!this.UserDetails) {
      this.toast.showToast(
        TOAST_STATE.success,
        'Going to Login First');
      this.toast.dismiss()
      this.router.navigate(['/auth/login'])
    } else {
      const items = this.saveOrderDetails(this.UserDetails)
      this.productsService.createOrder(items).subscribe(
      (res)=>{
        // console.log('res',res)
        this.toast.showToast(
          TOAST_STATE.success,
          'Order Is Successfully');
        this.toast.dismiss()
        this.router.navigate(['/'])
      },
      (err)=>{
        console.log('err',err)
      })
    }
  }

  saveOrderDetails(UserDetails: IUser) {
    return this.products.map((el) => {
      let item = {...el};
      item.itemId = item._id
      delete item._id
      return {
        item: item,
        customerId: UserDetails._id,
        address: this.userContact.value.address,
        phone: this.userContact.value.phone,
        paymentType: this.OrderDetails.paymentType,
        paymentStatus: this.OrderDetails.paymentStatus,
      }
    })
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
