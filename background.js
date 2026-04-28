var workersCopyBlockList = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    workersCopyBlockList = message;
    sendResponse({"status" : "all good"});
    console.log(workersCopyBlockList);
});

function myloop()
{

}

//const loopinterval = setInterval(myloop, 5000)
