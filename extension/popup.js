let shoppingCart = [];

document.addEventListener('DOMContentLoaded', async () => {

  chrome.storage.sync.get(['email'], async (result) => {
   if(result.email){
    console.log('yes')
   } else {
     console.log('no');
     chrome.tabs.create({ url: 'https://rapyd-flex.netlify.app/' });
   }
});
  // chrome.runtime.sendMessage({type:'setUser'});   
  


    // messageSubscription();
    // loadShoppingCart();
    // updateCartItems();

});

function loadShoppingCart(){
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

  shoppingCart.push(data);
  const newData = {...data};
  newData.productName = "hello world"
  shoppingCart.push(newData);
  shoppingCart.push(newData);
  shoppingCart.push(newData);
  shoppingCart.push(newData);

  $('#itemCount').html(shoppingCart.length);
}

function updateCartItems(){
  shoppingCart.forEach(item => {
    $('#cartItemsContainer').append(`
    <div class="cartItem">
    <div class="ItemWrapper">

        <div class="itemHeader">
          <div class="itemName">${item.productName}</div>
        </div>

        <div class="itemInfo">
            <div class="itemImage" >
              <img src="${item.productImage}" alt="">
            </div>
            <div class="itemBodyWrapper">
              <div class="itemBody">
                
                  <div class="itemSellerDetails">
                    <div class="itemPriceDetails">
                      <div class="currency">INR</div>
                      <div class="itemPrice">${item.productPrice}</div>
                      x
                      <div class="itemQuantity">${item.productQuantity}</div>
                    </div>
                    <div class="shippingDetails">
                      <div class="shippingIncluded">
                      Shipping: 
                      <div class="currency">INR</div>
                      <div class="price">0</div>
                      </div>
                    </div>
                </div>
                <div class="totalPriceWrapper">
                    <div class="TotalPrice">
                      <div class="currency">INR</div>
                      <div class="itemTotalPrice">${item.productPrice * item.productQuantity}</div>
                    </div>
                    <div class="itemActions">
                    <!-- <div class="selectItem">Select</div> -->
                      <div class="deleteItem">Delete</div>
                  </div>
                </div>
              </div>
              <div class="itemSellerName">
                  Seller : 
                  <div class="sellerName">${item.sellerName}</div>
                  <div class="verifiedIcon"></div> 
              </div>
            </div>
          </div>

    </div>   

  </div>
    `);

  });
}

function showNotifications(){
 let opt = {
    iconUrl: "./icon4Inverted.png",
    type: 'basic',
    title: 'Items in your cart',
    message: 'You have items in your cart',
    priority: 1,
    buttons: [ { title: 'Ok'}]
  }
chrome.notifications.create('notificationId', opt, () => {});
}

function messageSubscription(){
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {                                                                                                                                                                                                                                                                                                            
    console.log(request, sender, sendResponse);                                                                                                                                                           
  });
}

