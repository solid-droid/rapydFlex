import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckoutComponent } from './screens/checkout/checkout.component';
import { StoreComponent } from './screens/store/store.component';
import { LoginComponent } from './screens/login/login.component';
import { RoutingControlComponent } from './components/routing-control/routing-control.component';
import { HomeComponent } from './screens/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import {SpeedDialModule} from 'primeng/speeddial';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {RippleModule} from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { PayDetailsPopupComponent } from './components/pay-details-popup/pay-details-popup.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import {SidebarModule} from 'primeng/sidebar';
import {DropdownModule} from 'primeng/dropdown';
import { MessageService } from 'primeng/api';


import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider} from 'angularx-social-login';


@NgModule({
  declarations: [
    AppComponent,
    CheckoutComponent,
    StoreComponent,
    LoginComponent,
    RoutingControlComponent,
    HomeComponent,
    HeaderComponent,
    PayDetailsPopupComponent,
    AnalyticsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SpeedDialModule,
    BrowserAnimationsModule,
    FormsModule,
    MessagesModule,
    MessageModule,
    ProgressSpinnerModule,
    RippleModule,
    ToastModule,
    SidebarModule,
    DropdownModule,
    SocialLoginModule
  ],
  providers: [   {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            environment.googleLogin
          )
        },
      ]
    } as SocialAuthServiceConfig,
  },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
