import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CartComponent} from "./cart/cart.component";
import {OrdersComponent} from "./orders/orders.component";
import {GuardGuard} from "../core/guard/guard.guard";
import {SingleOrderComponent} from "./single-order/single-order.component";

const routes: Routes = [
  {
    path: '',
    component : CartComponent
  },
  {
    path: 'orders',
    canActivate: [GuardGuard],
    component : OrdersComponent
  },
  {
    path: 'orders/:id',
    canActivate: [GuardGuard],
    component : SingleOrderComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
