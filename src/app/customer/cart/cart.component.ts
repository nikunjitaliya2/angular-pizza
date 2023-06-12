import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProductsService} from "../../core/service/products/products.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  availableCart: string[]
  products: any[] = []
  userContact: FormGroup | any;
  quantity: number = 1
  totalCost = 0;
  OrderDetails = {
    Address : '',
    PhoneNumber : 0,
    OrderedItem : String,
    TotalCost  : 0
  }

  constructor(
    private router: Router,
    private productsService: ProductsService,
    private formBuilder: FormBuilder,
  ) {
    this.availableCart = <string[]>JSON.parse(<string>localStorage.getItem('cart')) || []
    this.OrderDetails.OrderedItem = this.availableCart
  }

  ngOnInit(): void {
    this.allCart()
    this.userContact = this.formBuilder.group({
      Address: new FormControl('', [Validators.required]),
      Phone: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }
  totalCostFn(){
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
    if (this.userContact.valid) {
      this.OrderDetails.Address = this.userContact.value.Address
      this.OrderDetails.PhoneNumber = this.userContact.value.Phone
      this.OrderDetails.TotalCost = this.totalCost

      console.log('User contact Details', this.OrderDetails)
    }
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

  removeCart(data :any , id : string){
    const newArr = [...this.products];
    const newCartArr = newArr.filter((el) => el._id !== id);
    const index = newArr.findIndex((el: { _id: string; }) => el._id === id)
    newArr.splice(index, 1, ...newCartArr);
    this.products = newCartArr
    this.menuRemoveToLocal( data._id)
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
