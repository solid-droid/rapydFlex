import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckoutComponent } from './screens/checkout/checkout.component';
import { StoreComponent } from './screens/store/store.component';
import { LoginComponent } from './screens/login/login.component';
import { RoutingControlComponent } from './components/routing-control/routing-control.component';
import { HomeComponent } from './screens/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    CheckoutComponent,
    StoreComponent,
    LoginComponent,
    RoutingControlComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
