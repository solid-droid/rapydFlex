import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GetDataService } from 'src/app/services/get-data/get-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  currency:string = 'USD';
  payNow = false;
  showCart = true;
  showPastOrders = false;
  showShop = false;
  $subscription1:any;
  constructor(
    public readonly getData: GetDataService,
    private messageService: MessageService,
  ) { }
  ngOnDestroy() {
    this.$subscription1?.unsubscribe();
  }

  ngOnInit(): void {
    this.$subscription1 = this.getData.getRoute.subscribe((route:any) => {
      if(route.type){
        if(route.type === 'flexshop'){
          this.showCart = false;
          this.showPastOrders = false;
          this.showShop = true;
        }

        if(route.type === 'pastorders'){
          this.showCart = false;
          this.showPastOrders = true;
          this.showShop = false;
        }

      } else {
        this.showCart = true;
        this.showPastOrders = false;
        this.showShop = false;
        if(route.id){
         
          this.updateCart(route.id , route.wallet);
        }
      }
    });
  }

  async updateCart(storeID:string,affiliateWallet:string){
      const store = await this.getData.getShop(storeID);
      if(store.success){       
        while(!this.getData.checkoutLoadingCompleted){
          await new Promise(r => setTimeout(r, 100));
        }
        if(this.getData.cartData.cart.find((item:any) => item.productCode === store.data._id)){
          this.messageService.add({ severity: 'error', summary: 'Cart', detail: 'Product already in cart' });
        } else {
          this.getData.cartData.cart.push();
          const newItem = {
            productCode: store.data._id,
            productName: store.data.productName,
            productPrice: store.data.productPrice,
            productQuantity:1,
            productURL: store.data.productURL,
            productImage: store.data.productImage,
            sellerName: store.data.sellerName,
            sellerEmail: store.data.sellerEmail,
            sellerWalletIDs: [{wallet:store.data.rapydWallet, amount:store.data.productPrice, seller:true}],
            supportLink: store.data.supportLink,
            recordTime: String(new Date())
          };
          if(affiliateWallet){
            newItem.sellerWalletIDs = [
              {wallet:affiliateWallet, amount:store.data.productPrice * (store.data.affiliatePercent/100), seller:false},
              {wallet:store.data.rapydWallet, amount:store.data.productPrice * (1-store.data.affiliatePercent/100), seller:true}
            ]

          }
          this.getData.cartData.cart.push(newItem);
          await this.getData.saveCart(this.getData.cartData);
          this.getData.setUser(this.getData.getUser() || '');
          this.messageService.add({ severity: 'success', summary: 'Cart', detail: 'Product added to cart' });
        }
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Shop not found' });
      }
  }

}
