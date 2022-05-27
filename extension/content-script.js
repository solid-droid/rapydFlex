chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request,sender,sendResponse);
});
var port = chrome.runtime.connect();
window.addEventListener("message", (event) => {
    // We only accept messages from ourselves
    if (event.source != window) {
      return;
    }
  
    if (event.data.type && (event.data.type == "rapydFlex")) {
      const email = event?.data?.email;
      //CHECK IF EMAIL IS VALID
        if(email.includes('@')){
            chrome.storage.sync.set({'email': email});
        }
    }
  }, false);