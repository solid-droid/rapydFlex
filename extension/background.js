console.log('background');

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
