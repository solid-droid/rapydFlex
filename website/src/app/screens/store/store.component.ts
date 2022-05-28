import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GetDataService } from 'src/app/services/get-data/get-data.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  constructor(
    private getData: GetDataService,
    private messageService: MessageService,
  ) { }

  url = '';
  defaultUrl = 'https://rapyd-flex.netlify.app/shop/';
  id:any = null;

  productName = '';
  productPrice = 0;
  productImage = '';
  productUrl = '';
  sellerName = '';
  rapydWallet = '';
  supportLink = '';
  affiliatePercent = 2;



  ngOnInit(): void {
    this.url = '';
    this.id = null;
  }

  async publish() {
    if(this.productName == ''){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product Name not entered' });
      return;
    }
    if(this.productPrice <= 0){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product Price should be greater than 0' });
      return;
    }
    if(this.productImage == ''){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product Image not entered' });
      return;
    }
    if(this.productUrl == ''){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product Url not entered' });
      return;
    }
    if(this.sellerName == ''){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Seller Name not entered' });
      return;
    }
    if(this.rapydWallet == ''){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Rapyd Wallet not entered' });
      return;
    }
    if(this.supportLink == ''){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Support Link not entered' });
      return;
    }
    if(this.affiliatePercent <1){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Affiliate Percent should be greater than 1' });
      return;
    }

    const data:any = {
      productName: this.productName,
      productPrice: this.productPrice,
      productImage: this.productImage,
      productURL:this.productUrl,
      sellerName: this.sellerName,
      rapydWallet: this.rapydWallet,
      supportLink: this.supportLink,
      affiliatePercent:this.affiliatePercent,
      sellerEmail: this.getData.getUser(),
      active:true
    }
    if(this.id){
      data._id = this.id;
    }
    const store = await this.getData.saveStore(data);
    this.id = store.data._id;
    this.url = this.defaultUrl + this.id;
  }
}
