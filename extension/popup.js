let shoppingCart = [];

document.addEventListener('DOMContentLoaded', async () => {
  $('#signInButton').on('click', () => openWebsite());
  $('#pastOrdersButton').on('click', () => openPastOrders());
  $('#payTotalButton').on('click', () => openWebsite());


  chrome.storage.sync.get(['email'], async (result) => {
   if(result.email){
    fetchCart(result.email);
    $('#loginMask').hide();
   } else {
    $('#loginMask').show();
   }


});
  // chrome.runtime.sendMessage({type:'setUser'});   
  


    // 
    // loadShoppingCart();
    // updateCartItems();

});

async function fetchCart(email = 'nikhilmjeby.mec@gmail.com'){
  const checkout = await (await fetch('https://main--rapyd-flex-backend.netlify.app/.netlify/functions/api/userCart/'+email,)).json();
  loadShoppingCart(checkout?.data?.cart || []);
}

function openPastOrders(){
  chrome.tabs.create({ url: 'https://rapyd-flex.netlify.app/pastorders' });
}

function openWebsite(){
  chrome.tabs.create({ url: 'https://rapyd-flex.netlify.app' });
}

function loadShoppingCart(data){
  shoppingCart = data;
  const totalPrice = data.reduce((acc, item) => acc + item.productPrice * item.productQuantity, 0);
  $('#payTotalButton').html(`Pay $${totalPrice}`);
  $('#itemCount').html(shoppingCart.length);
  updateCartItems();
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
                      <div class="currency">USD</div>
                      <div class="itemPrice">${item.productPrice}</div>
                      x
                      <div class="itemQuantity">${item.productQuantity}</div>
                    </div>
                    <div class="shippingDetails">
                      <div class="shippingIncluded">
                      Shipping Included 
                      // <div class="currency">USD</div>
                      // <div class="price">0</div>
                      </div>
                    </div>
                </div>
                <div class="totalPriceWrapper">
                    <div class="TotalPrice">
                      <div class="currency">USD</div>
                      <div class="itemTotalPrice">${item.productPrice * item.productQuantity}</div>
                    </div>
                    <div class="itemActions">
                    <!-- <div class="selectItem">Select</div> -->
                    <!--  <div class="deleteItem">Delete</div> -->
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

