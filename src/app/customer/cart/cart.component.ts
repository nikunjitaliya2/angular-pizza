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

  constructor(
    private router: Router,
    private productsService: ProductsService,
    private formBuilder: FormBuilder,
  ) {
    this.availableCart = <string[]>JSON.parse(<string>localStorage.getItem('cart')) || []
  }

  ngOnInit(): void {
    this.allCart()
    this.userContact = this.formBuilder.group({
      Address: new FormControl('', [Validators.required]),
      Phone: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
    setTimeout(()=>{this.totalCost = this.products.reduce((acc, obj) => acc + obj.price, 0)},100)
  }

  allCart() {
    if (this.availableCart.length !== 0) {
      this.productsService.getAllMenus(this.availableCart).subscribe(
        (res: any) => {
          this.availableCart.forEach((item: any) => {
            res.filter((element: any) => {
              if (element._id === item) {
                this.products.push({...element, quantity: 1})
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
      console.log('User contact Details', this.userContact.value)
    } else {
      console.log('Invalid Credentials', this.userContact.value)
      return
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


  back() {
    this.router.navigateByUrl('/')
  }
}
