import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import {ProductsComponent} from "./products/products.component";
import {HomeComponent} from "./home/home.component";
import { OffersComponent } from './offers/offers.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProductsComponent,
    OffersComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
