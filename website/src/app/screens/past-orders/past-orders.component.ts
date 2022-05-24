import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/services/get-data/get-data.service';

@Component({
  selector: 'app-past-orders',
  templateUrl: './past-orders.component.html',
  styleUrls: ['./past-orders.component.scss']
})
export class PastOrdersComponent implements OnInit {
  checkouts:any = [];
  constructor(
    private readonly getData: GetDataService,
  ) { }

  async ngOnInit() {
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
