import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/services/get-data/get-data.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  shoppingCart:any = [];

  constructor(
    private readonly getData: GetDataService,
  ) { }

  
  async ngOnInit() {
    const _email = this.getData.getUser();
    if(_email){
      const data = await this.getData.getCart(_email);
      this.loadShoppingCart(data.data);
      this.getData.showLogin = false;
    }


    this.getData.getLoginUser.subscribe(async (email:any) => {
      if(email){
          const data = await this.getData.getCart(email);
          this.loadShoppingCart(data.data);
      }
    })

  }

  loadShoppingCart(data:any){
    this.shoppingCart = data.cart;
    const totalPrice = this.shoppingCart.map((item:any) => item.productPrice*item.productQuantity).reduce((a:any, b:any) => a + b, 0);
    this.getData.totalPriceUSD = totalPrice;

    //loading seller wallets.
    const paymentObj:any = {};
    this.shoppingCart
    .map((item:any) => item.sellerWalletIDs)
    .flat()
    .map((item:any) => ({ewallet :item.wallet , amount: item.amount}))
    .forEach((item:any) => {
      if(!paymentObj[item.ewallet]){
        paymentObj[item.ewallet] = 0;
      } 
      paymentObj[item.ewallet] += parseFloat(item.amount);
    });
    this.getData.paymentList = Object.keys(paymentObj).map((item:any) => ({ewallet:item, amount: String(paymentObj[item])}));
  }

}
