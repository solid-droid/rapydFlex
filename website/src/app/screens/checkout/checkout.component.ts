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
    } else {
      this.getData.showLogin = true;
    }


    this.getData.getLoginUser.subscribe(async (email:any) => {
      if(email){
          const data = await this.getData.getCart(email);
          this.loadShoppingCart(data.data);
      }
    })

  }

  async loadShoppingCart(data:any){
    ////////CheckoutStatus///////////////
    this.getData.cartData = data;

    const pendingItems = data.checkOuts.filter((item:any) => item.status !== 'CLO');
    for(let i =0; i<pendingItems.length; i++){
      const checkout = await this.getData.getCheckoutStatus(pendingItems[i].checkoutId);
      pendingItems[i].status = checkout.body.data.payment.status === 'CLO' ? 'CLO' : 'pending';
      await this.getData.saveCheckout(pendingItems[i].checkoutId,pendingItems[i].status,false);
    }
    const closedItems = data.checkOuts.filter((item:any) => item.status === 'CLO');
    for(let i =0; i<closedItems.length; i++){
      const checkout = await this.getData.getCheckout(closedItems[i].checkoutId);
      checkout.data.cart.forEach((item:any) => {
        data.cart = data.cart.filter((cartItem:any) => cartItem.productCode !== item.productCode);
      });
    }

    this.getData.cartData = data;
    await this.getData.saveCart(this.getData.cartData);
    ///////////////////////
    this.shoppingCart = data.cart.map((x:any,i:number)=>({...x,id:i}));
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

  async deleteEntry(entry:any){
    this.shoppingCart = this.shoppingCart.filter((item:any) => item.id !== entry.id);
    this.getData.cartData.cart = this.shoppingCart.map((item:any) => {
      const data = {...item}
      delete data.id;
      return data;
    });
    await this.getData.saveCart(this.getData.cartData);
  }

}
