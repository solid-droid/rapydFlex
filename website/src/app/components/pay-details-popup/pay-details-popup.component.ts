import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/services/get-data/get-data.service';

@Component({
  selector: 'app-pay-details-popup',
  templateUrl: './pay-details-popup.component.html',
  styleUrls: ['./pay-details-popup.component.scss']
})
export class PayDetailsPopupComponent implements OnInit {
  currencyOptions:any = [];
  selectedCurrency:any ;
  rate:any = 1;
  paymentOptions:any = [
            {name:'Bank Transfer',value:'bank_transfer'},
            {name:'E-wallet',value:'ewallet'},
            {name:'Card',value:'card'},
            {name:'Bank Redirect',value:'bank_redirect'}
  ];
  selectedPayment:any;
  currency = 'USD';

  constructor(
    public readonly getData:GetDataService
  ) { }

  async ngOnInit(){
    const countryList = await this.getData.fetchData('GET', this.getData.urlMethods.getCountries() );
    this.currencyOptions = countryList.body.data;
    await new Promise((r:any) => setTimeout(r, 100));
    this.selectedCurrency = {
      "id": 106,
      "name": "United States of America",
      "iso_alpha2": "US",
      "iso_alpha3": "USA",
      "currency_code": "USD",
      "currency_name": "US Dollar",
      "currency_sign": "$",
      "phone_code": "1"
  };
    this.getData.totalPrice = this.getData.totalPriceUSD;
  }
  async onCurrencyChange(){
    const result = await this.getData.fetchData('GET', this.getData.urlMethods.getDailyRates('USD',this.selectedCurrency.currency_code) );
    this.rate = result?.body?.data?.rate || 1;
    this.getData.totalPrice =parseFloat(String( this.rate * this.getData.totalPriceUSD)).toFixed(2);

  }
  async createRapydPayment(){
    const method = 'POST';
    const url = this.getData.urlMethods.createCheckout();
    const body = {
      amount: this.getData.totalPrice ,
      country: this.selectedCurrency.iso_alpha2,
      currency: this.selectedCurrency.currency_code,
      payment_method_type_categories:[this.selectedPayment.value],
      //convert rate
      ewallets: this.getData.paymentList.map((item:any) => ({ewallet:item.ewallet, amount: item.amount *  this.rate})),
      complete_checkout_url: 'https://rapyd-flex.netlify.app',
      cancel_checkout_url:'https://rapyd-flex.netlify.app',
      // requested_currency: 'USD',
      // merchant_reference_id: 'testReferenceId123',
      // escrow: true,
      // escrow_release_days: 2,
    };
    console.log(body);
    const data = await this.getData.fetchData(method, url , body);
    console.log(data);
    const {redirect_url, id} = data.body.data;
    document.location.href = redirect_url;
    // this.getCheckoutStatus();
  }
  

  async getCheckoutStatus(){
    const method = 'GET';
    const id = 'checkout_4e97851266967fc3767a66373b826dd7';
    const url = this.getData.urlMethods.createCheckout()+'/'+id;    
    const data = await this.getData.fetchData(method, url);
    console.log(url);
    console.log(data);

  }
}
