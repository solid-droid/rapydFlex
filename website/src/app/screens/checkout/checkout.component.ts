import { Component, OnDestroy, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/services/get-data/get-data.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  $subscription1:any;
  
  constructor(
    public readonly getData: GetDataService,
  ) { }

  ngOnDestroy() {
   this.$subscription1?.unsubscribe();
  }

  
  ngOnInit() {
    this.beginSubscriptions();

  }

  async beginSubscriptions(){
    const _email = this.getData.getUser();
    if(_email){
      const data = await this.getData.getCart(_email);
      this.loadShoppingCart(data.data);
      this.getData.showLogin = false;
    } else {
      this.getData.showLogin = true;
      this.getData.showLoading = false;
    }


    this.$subscription1 = this.getData.getLoginUser.subscribe(async (email:any) => {
      if(email){
          const data = await this.getData.getCart(email);
          this.loadShoppingCart(data.data);
      }
    })
  }

  async loadShoppingCart(data:any){
    ////////CheckoutStatus///////////////
    this.getData.checkoutLoadingCompleted = false;
    this.getData.showLoading = true;
    if(!data){
      data = {
        cart: [],
        checkOuts: [],
        email: this.getData.getUser()
      }
    }
    this.getData.cartData = data;
    const pendingItems = data.checkOuts.filter((item:any) => {
      const diff = Math.abs(new Date().getTime() - new Date(item.timeStamp).getTime()) / 3600000;
      if(item.status !== 'CLO' && diff < 1){
        return true
      } else{
        return false;
      } 
    });
    const _resp = await Promise.all(pendingItems.map((item:any)=> this.getData.getCheckoutStatus(item.checkoutId)));
    _resp.forEach((checkout:any , i:any) => {
      pendingItems[i].status = checkout.body.data.payment.status === 'CLO' ? 'CLO' : 'pending';
      this.getData.saveCheckout(pendingItems[i].checkoutId,pendingItems[i].status,false);
    });
    const closedItems = data.checkOuts.filter((item:any) => item.status === 'CLO');
    for(let i =0; i<closedItems.length; i++){
      const checkout = await this.getData.getCheckout(closedItems[i].checkoutId);
      checkout.data.cart.forEach((item:any) => {
        data.cart = data.cart.filter((cartItem:any) => !(cartItem.productCode == item.productCode && cartItem.recordTime == item.recordTime));
      });
    }

    this.getData.cartData = data;
    await this.getData.saveCart(this.getData.cartData);
    ///////////////////////
     this.updatePayment();
    this.getData.checkoutLoadingCompleted = true;
    this.getData.showLoading = false;
  }

  async deleteEntry(entry:any){
    this.getData.cartData.cart = this.getData.cartData.cart.filter((item:any) => item.productCode !== entry.productCode);
    this.updatePayment();
    await this.getData.saveCart(this.getData.cartData);
  }

  updatePayment(){
    const totalPrice = this.getData.cartData.cart.map((item:any) => item.productPrice*item.productQuantity).reduce((a:any, b:any) => a + b, 0);
    this.getData.totalPriceUSD = totalPrice;
    this.getData.setPrice();
    //loading seller wallets.
    const paymentObj:any = {};
    this.getData.cartData.cart
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
