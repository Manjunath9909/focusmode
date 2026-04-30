var workersCopyBlockList = null;
var loopinterval = null;

/*chrome.tabs.query({active : true, currentWindow : true}, function(tabs){
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {request : "Requesting stored data"}, (resp) => {
        workersCopyBlockList = resp;
        console.log(workersCopyBlockList);
    });
});*/


// listner to get stored data when the data changes
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    workersCopyBlockList = message;
    sendResponse({"status" : "all good"});
    //console.log(workersCopyBlockList);
});

//Listner for when the start or stop button in clicked
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.status == "start") {console.log("starting"); start(message.data);}
    else if(message.status == "stop") {console.log("stopping"); stop();}
    sendResponse("all good");
});

//function to get the stored data when button is clicked
function start(storedData)
{
    loopinterval = setInterval(myloop, 7000);
    workersCopyBlockList = JSON.parse(storedData) //some data we will be bringing forward. should be assigned here 
}

function stop()
{
    clearInterval(loopinterval);
    chrome.storage.local.set({"redirectlist": workersCopyBlockList}).then(() => {console.log("Data saved");});
}

async function myloop()
{   
    let queryOptions = {active : true, lastFocusedWindow : true};
    let [tab] = await chrome.tabs.query(queryOptions);
    handleBlock(tab);
}

function handleBlock(tab)
{
    let url = null;
    try {
        url = new URL(tab.url)
        var host = url.hostname;
        var websiteName = host.replace(/www.|developer./, "");
        websiteName = websiteName.replace(/.com|.org|.in|.tv/, "");
        //console.log(workersCopyBlockList.redirectlist);
        //console.log(websiteName);
        //handle the blocking here 
        if (workersCopyBlockList.redirectlist.includes(websiteName))
        {
            console.log("This is a blocked website : "+websiteName);
        }

        //continue here . . . . . .

    } catch (error) {
        console.log("URL Not found. Switch back to a browser tab");
    }
}


