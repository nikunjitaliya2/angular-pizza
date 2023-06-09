import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HeaderComponent} from "./common/header/header.component";
import { GuardGuard } from './core/guard/guard.guard';
const routes: Routes = [
  {
    path:'auth',
    component:HeaderComponent,
    loadChildren:()=>import('./user/user.module').then((u)=>u.UserModule),
  },
  {
    path: '',
    component:HeaderComponent,
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),

  },
  {
    path: 'cart',
    component:HeaderComponent,
    loadChildren: () => import('./customer/cart-routing.module').then(m => m.CartRoutingModule),
  },

  {path:'',redirectTo:'auth',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
