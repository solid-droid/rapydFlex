import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/services/get-data/get-data.service';

@Component({
  selector: 'app-pay-details-popup',
  templateUrl: './pay-details-popup.component.html',
  styleUrls: ['./pay-details-popup.component.scss']
})
export class PayDetailsPopupComponent implements OnInit {
  currencyOptions:any = [];
  selectedCurrency:any;
  paymentOptions:any = [
            {name:'Bank Transfer',value:'bank_transfer'},
            {name:'E-wallet',value:'ewallet'},
            {name:'Card',value:'card'},
            {name:'Bank Redirect',value:'bank_redirect'}
  ];
  selectedPayment:any;
  totalPrice = 10000;
  currency = 'INR';

  constructor(
    private readonly getData:GetDataService
  ) { }

  ngOnInit(): void {
  }

  async createRapydPayment(){
    const method = 'POST';
    const url = this.getData.urlMethods.createCheckout();
    const body = {...this.getData.body};
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
