import { Component, OnDestroy, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/services/get-data/get-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  currency:string = 'USD';
  payNow = false;
  showCart = true;
  showPastOrders = false;
  showShop = false;
  $subscription1:any;
  constructor(
    public readonly getData: GetDataService,
  ) { }
  ngOnDestroy() {
    this.$subscription1?.unsubscribe();
  }

  ngOnInit(): void {
    this.$subscription1 = this.getData.getRoute.subscribe((route:any) => {
      if(route.type){
        if(route.type === 'flexshop'){
          this.showCart = false;
          this.showPastOrders = false;
          this.showShop = true;
        }

        if(route.type === 'pastorders'){
          this.showCart = false;
          this.showPastOrders = true;
          this.showShop = false;
        }

      } else {
        this.showCart = true;
        this.showPastOrders = false;
        this.showShop = false;
      }
    });
  }

}
