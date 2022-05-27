chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request,sender,sendResponse);
});
var port = chrome.runtime.connect();
window.addEventListener("message", (event) => {
    // We only accept messages from ourselves
    if (event.source != window) {
      return;
    }
  
    if (event.data.type && (event.data.type == "FROM_PAGE")) {
      const email = event.data.text;
        chrome.storage.sync.set({'email': email});
    }
  }, false);