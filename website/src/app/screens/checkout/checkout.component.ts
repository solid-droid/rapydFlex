import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  shoppingCart:any = [];

  constructor() { }

  
  ngOnInit() {
    this.loadShoppingCart();
  }

  loadShoppingCart(){
    const data = {
      "productName": "INICIO Mini DisplayPort to Display Port Cable 3.3ft/1m Mini DP to DP Adapter 4K@60Hz 2K@144Hz Compatible for MacBook Air Pro (Before 2016) Surface Pro Dock HP Lenovo etc",
      "productPrice": "10005",
      "productQuantity": "10",
      "productImage": "https://m.media-amazon.com/images/I/61jAM2SNesL._SX425_.jpg",
      "productDescription": "INICIO Mini DisplayPort to Display Port Cable 3.3ft/1m Mini DP to DP Adapter 4K@60Hz 2K@144Hz Compatible for MacBook Air Pro (Before 2016) Surface Pro Dock HP Lenovo etc",
      "productCode": "1234",
      "productURL": "https://www.amazon.in/gp/product/B09V182FTY/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1",
      "productCategory": "Electronics",
      "productSubCategory": "Cables",
  
      "sellerCode": "1112",
      "sellerName": "Amazon",
      "sellerVerified": "true",
      "sellerRating": "4.5",
      "sellerWalletIDs": [
        {wallet: "ewallet_fa5b17e3bd5f281e46422f9ec743b807", amount: "100", seller: true},
        {wallet:"ewallet_f723844735036650050469453ac0e413", amount: "5", seller: false}
      ],
      "sellerSupportLink": "https://www.amazon.in/",
      "shippingAddress": {
        "addressLine1": "Flat No. 1, Building No. 1, Sector 1, Pocket 1,",
        "addressLine2": "Gurgaon, Haryana 122001",
        "state": "Haryana",
        "country": "India",
        "pinCode": "122001",
        "phoneNumber": "9876543210",
        "email": "xyz@gmail.com",
      },
      "shippingCharges": "0",
      "shippingAddressAvailable": "true",
      "shippingAddressNeeded": "true",
      "editShipping": "true",
    }
  
    this.shoppingCart.push(data);
    const newData = {...data};
    newData.productName = "hello world"
    this.shoppingCart.push(newData);
    this.shoppingCart.push(newData);
    this.shoppingCart.push(newData);
    this.shoppingCart.push(newData);
  }
  
}
