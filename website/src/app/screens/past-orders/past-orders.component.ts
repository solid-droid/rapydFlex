import { Component, OnDestroy, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/services/get-data/get-data.service';

@Component({
  selector: 'app-past-orders',
  templateUrl: './past-orders.component.html',
  styleUrls: ['./past-orders.component.scss']
})
export class PastOrdersComponent implements OnInit, OnDestroy {
  checkouts:any = [];
  $subscription1:any;
  constructor(
    private readonly getData: GetDataService,
  ) { }
  ngOnDestroy() {
      this.$subscription1?.unsubscribe();
  }

  async ngOnInit() {
    const _email = this.getData.getUser();
    this.$subscription1 = this.getData.getLoginUser.subscribe(async (email:any) => {
      if(email){
        this.loadPastOrders();
      }
    })
    if(_email){
      this.loadPastOrders();
    } else {
      this.getData.showLoading = false;
    }
    
  }


 async loadPastOrders(){
    this.getData.showLoading = true;
    while(!this.getData.checkoutLoadingCompleted){
      await new Promise(r => setTimeout(r, 100));
    }
    this.checkouts = this.getData.cartData.checkOuts.map((x:any) => ({...x, data: {}}));
    this.checkouts.reverse();
    for(let i =0; i< this.checkouts.length; i++){
     this.getData.getCheckout(this.checkouts[i].checkoutId).then((item:any)=>{
        this.checkouts[i].data = item.data;  
      });
    }
    this.getData.showLoading = false;
  }
}
