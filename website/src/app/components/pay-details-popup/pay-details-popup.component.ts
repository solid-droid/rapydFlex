import { Component, OnDestroy, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/services/get-data/get-data.service';

@Component({
  selector: 'app-pay-details-popup',
  templateUrl: './pay-details-popup.component.html',
  styleUrls: ['./pay-details-popup.component.scss']
})
export class PayDetailsPopupComponent implements OnInit,OnDestroy {
  currencyOptions:any = [];
  selectedCurrency:any ;
  rate:any = 1;
  disablePay = false;
  // paymentOptions:any = [
  //           {name:'Bank Redirect',value:'bank_redirect'},
  //           {name:'Bank Transfer',value:'bank_transfer'},
  //           {name:'E-wallet',value:'ewallet'},
  //           {name:'Card',value:'card'},
  //           {name:'Bank Redirect',value:'bank_redirect'}
  // ];
  // selectedPayment:any;
  currency = 'USD';
  $subscription1:any;
  constructor(
    public readonly getData:GetDataService
  ) { }
  ngOnDestroy() {
    this.$subscription1?.unsubscribe();
  }

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
  this.$subscription1 = this.getData.getPrice.subscribe((price:any) => {
    this.getData.totalPrice = this.getData.totalPriceUSD.toFixed(2);
  });
  }
  async onCurrencyChange(){
    this.disablePay = true;
    const result = await this.getData.fetchData('GET', this.getData.urlMethods.getDailyRates('USD',this.selectedCurrency.currency_code) );
    this.rate = result?.body?.data?.rate || 1;
    this.getData.totalPrice =parseFloat(String( this.rate * this.getData.totalPriceUSD)).toFixed(2);
    this.disablePay = false;

  }
  async createRapydPayment(){
    if(!this.disablePay){
      const method = 'POST';
      const url = this.getData.urlMethods.createCheckout();
      const body = {
        amount: this.getData.totalPrice ,
        country: this.selectedCurrency.iso_alpha2,
        currency: this.selectedCurrency.currency_code,
        ewallets: this.getData.paymentList.map((item:any) => ({ewallet:item.ewallet, amount: (item.amount *  this.rate).toFixed(2)})),
        complete_checkout_url: 'https://rapyd-flex.netlify.app',
        cancel_checkout_url:'https://rapyd-flex.netlify.app',
        escrow: true,
        escrow_release_days: 30,
        // requested_currency: 'USD',
        // merchant_reference_id: 'testReferenceId123',
        // payment_method_type_categories:[this.selectedPayment.value],
      };
      const data = await this.getData.fetchData(method, url , body);
      const {redirect_url, id} = data.body.data;
      await this.getData.saveCheckout(id, 'pending', true, body);
      document.location.href = redirect_url;
    }

  }
}
