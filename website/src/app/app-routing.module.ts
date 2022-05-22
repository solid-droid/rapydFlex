import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutingControlComponent } from './components/routing-control/routing-control.component';
import { HomeComponent } from './screens/home/home.component';

const routes: Routes = [
  { path: '', component: RoutingControlComponent },
  { path: ':type', component: RoutingControlComponent },
  { path: ':type/:id', component: RoutingControlComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
