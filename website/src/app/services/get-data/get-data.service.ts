import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  totalPrice:any = 0;
  totalPriceUSD:any = 0;
  paymentList:any = [];
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
   getDailyRates:(from:string,to:string) => `/v1/rates/daily?action_type=payment&buy_currency=${to}&fixed_side=buy&sell_currency=${from}`,
  }
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

  async saveCart(cart:any){
    return await (await fetch(this.url+'userCart',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cart),
    })).json();
  }

  async saveCheckout(checkout:any){
    return await (await fetch(this.url+'checkout',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(checkout),
    })).json();
  }

  async getCheckout(checkoutID:string){
    return await (await fetch(this.url+'checkout/'+checkoutID,)).json();
  }

  async getCountries(){
    return await this.fetchData('GET', this.urlMethods.getCountries());
  }
}
