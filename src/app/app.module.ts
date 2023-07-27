import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FooterComponent} from './common/footer/footer.component';
import {HomeModule} from "./home/home.module";
import {HeaderComponent} from "./common/header/header.component";
import {HttpClientModule} from "@angular/common/http";
import {UserModule} from "./user/user.module";
import {CartModule} from "./customer/cart.module";
import {NotfoundComponent} from './common/notfound/notfound.component';
import {AdminModule} from "./admin/admin.module";
import {FormsModule} from "@angular/forms";
import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
import {environment} from "../environment/environment";

const config: SocketIoConfig = {url: environment.SocketUrl, options: {transports: ['websocket'], forceNew: true}};

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HomeModule,
    HttpClientModule,
    UserModule,
    CartModule,
    AdminModule,
    FormsModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
