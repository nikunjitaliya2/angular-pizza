import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../core/service/products/products.service";
import {TOAST_STATE, ToastService} from "../../core/service/toast.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productDetails: any[] = []
  cartArr: string[]
  changeStyle = '';

  constructor(
    private product: ProductsService,
    private toast: ToastService
  ) {
    this.cartArr = <string[]>JSON.parse(<string>localStorage.getItem('cart')) || []
  }

  ngOnInit(): void {
    this.product.getAllMenus().subscribe(
      (res: any) => {
        if (this.cartArr.length !== 0) {
          res.forEach((item: any) => {
            let isLocal = this.cartArr.find(id => id === item._id);
            if (isLocal) {
              const arr = [...this.productDetails]
              arr.push({...item, isActive: true})
              this.productDetails = arr
            } else {
              const arr = [...this.productDetails]
              arr.push({...item, isActive: false})
              this.productDetails = arr
            }
          })
        } else {
          this.productDetails = res;
        }
      },
      (error) => {
        this.toast.showToast(
          TOAST_STATE.danger,
          error.error.message);
      }
    )
  }

  addCart(data: any, id: string) {

    if (data.isActive) {
      const newArr = [...this.productDetails];
      const menu = newArr.findIndex((el: { _id: string; }) => el._id === id)
      delete data.isActive
      newArr.splice(menu, 1, data);
      this.productDetails = newArr

      if (this.cartArr) this.menuRemoveToLocal(id)

    } else {
      const newArr = [...this.productDetails];
      const menu = newArr.findIndex((el: { _id: string; }) => el._id === id)
      newArr.splice(menu, 1, {...data, isActive: true});
      this.productDetails = newArr

      if (this.cartArr.length !== 0)
        this.menuAddToLocal(data._id)
      else
        this.menuAddToLocal(data._id)
    }
  }

  menuAddToLocal(id: string) {
    this.cartArr.push(id)
    localStorage.setItem('cart', JSON.stringify(this.cartArr));
  }

  menuRemoveToLocal(id: string) {
    const newArr = [...this.cartArr];
    const newCartArr = newArr.filter((el) => el !== id);
    this.cartArr = newCartArr

    localStorage.setItem('cart', JSON.stringify(newCartArr));
  }
}
