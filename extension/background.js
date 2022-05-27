chrome.notifications.onButtonClicked.addListener((id, btn) =>{
    console.log('test', id, btn);
    chrome.windows.create(
        {
            url: 'popup.html',
            width:  430,
            height: 655,
            type:'panel'
        }
    );
});

  function sendQuestions()                                                                                                                                                                                    
{  
    chrome.action.setBadgeText({text: "10+"});                                                                                                                                                                                                           
 chrome.runtime.sendMessage({greeting: "hello"}, () => {});                                                                                                                         
}  

// setInterval(sendQuestions, 1000);
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {                                                                                                                                                                                                                                                                                                            
    if(request.type == 'setUser'){
        chrome.storage.sync.set({'user': 'test'});
    }   
    
    if(request.type == 'getUser'){
        chrome.storage.sync.get(['user'], async (result) => {
            // await new Promise(r => setTimeout(r, 1000));
            // chrome.runtime.sendMessage(result); 
        });
    }

    sendResponse(request);
})