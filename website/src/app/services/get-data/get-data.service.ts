import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  totalPrice:any = 0;
  totalPriceUSD:any = 0;
  paymentList:any = [];
  showLogin = false;
  cartData:any = undefined;
  checkoutLoadingCompleted = false;
  url = environment.backendUrl;
  body = {
    amount: 110,
    country: 'IN',
    currency: 'INR',
    payment_method_type_categories:['ewallet' ],
     ewallets:[
        {ewallet : 'ewallet_001', amount: 10},
        {ewallet : 'ewallet_001', amount: 5},
        {ewallet : 'ewallet_002', amount: 15},
     ],
    // requested_currency: 'USD',
    complete_checkout_url: 'https://rapyd-flex.netlify.app',
    cancel_checkout_url:'https://rapyd-flex.netlify.app',
    merchant_reference_id: 'testReferenceId123',
    // escrow: true,
    // escrow_release_days: 2,
  };

  urlMethods = {
   getCountries: () => '/v1/data/countries',
   getPayment_Methods: (country:string) => `/v1/payment_methods/country?country=${country}`,
   createCheckout: () => '/v1/checkout',
   getCheckoutStatus: (checkoutID:string) => `/v1/checkout/${checkoutID}`,
   getDailyRates:(from:string,to:string) => `/v1/rates/daily?action_type=payment&buy_currency=${to}&fixed_side=buy&sell_currency=${from}`,
  }

  private readonly Observable_loginUser:any = new BehaviorSubject(undefined);
  getLoginUser = this.Observable_loginUser.asObservable();

  private readonly Observable_price:any = new BehaviorSubject({type:null,id:null});
  getPrice = this.Observable_price.asObservable();

  private readonly Observable_route:any = new BehaviorSubject({type:null,id:null});
  getRoute = this.Observable_route.asObservable();

  constructor() { }

  async fetchData(method:string, url:string, body={}){
    return await(await fetch(this.url+'api',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            url,
            method,
            body
        }),
    })).json();
}

  async getCart(email:string){
    return await (await fetch(this.url+'userCart/'+email,)).json();
  }

  setPrice(){
    this.Observable_price.next(this.totalPriceUSD);
  }

  getUser(){
    return localStorage.getItem('user');
  }

  setRoute(type:any , id:any){
    this.Observable_route.next({type,id});
  }
  setUser(email:string){
    localStorage.setItem('user', email);
    this.Observable_loginUser.next(email);
  }
  async saveCart(cart:any){
    return await (await fetch(this.url+'userCart',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cart),
    })).json();
  }

  async saveStore(storeDetails:any){
    return await (await fetch(this.url+'store',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(storeDetails),
    })).json();
  };

  async getShop(shopID:string){
    return await (await fetch(this.url+'store/'+shopID,)).json();
  }

  async saveCheckout(checkoutId:string,status:string = 'pending' , updateCart = true){
    if(updateCart){
      this.cartData.checkOuts.push({checkoutId, status: 'pending'});
      await this.saveCart(this.cartData);
    }
    const body = {
      checkoutId,
      userID:this.cartData.email,
      cart:this.cartData.cart,
      status,
      updateCart
    };
    return await (await fetch(this.url+'checkout',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    })).json();
  }

  async getCheckout(checkoutID:string){
    return await (await fetch(this.url+'checkout/'+checkoutID,)).json();
  }

  async getCheckoutStatus(checkoutID:string){
    return await this.fetchData('GET',this.urlMethods.getCheckoutStatus(checkoutID));
  }

  async getCountries(){
    return await this.fetchData('GET', this.urlMethods.getCountries());
  }
}
