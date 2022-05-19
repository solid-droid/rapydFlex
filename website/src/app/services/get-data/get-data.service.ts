import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  url = "http://localhost:9000/.netlify/functions/api/api";
  body = {
    amount: 110,
    country: 'IN',
    currency: 'INR',
    payment_method_type_categories:['ewallet',
     ],
     ewallets:[
        {ewallet : 'ewallet_b14d345b35efbe940ec12993103aafe9', amount: 50},
        {ewallet : 'ewallet_fa5b17e3bd5f281e46422f9ec743b807', amount: 60},
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
  }
  constructor() { }

  async fetchData(method:string, url:string, body={}){
    return await(await fetch(this.url,{
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

}
