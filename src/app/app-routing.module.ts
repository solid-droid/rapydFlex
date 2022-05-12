import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './screens/checkout/checkout.component';
import { HomeComponent } from './screens/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '/test', component: CheckoutComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
