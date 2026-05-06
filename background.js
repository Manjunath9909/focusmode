var workersCopyBlockList = null;
var loopinterval = null;

/*chrome.tabs.query({active : true, currentWindow : true}, function(tabs){
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {request : "Requesting stored data"}, (resp) => {
        workersCopyBlockList = resp;
        console.log(workersCopyBlockList);
    });
});*/

chrome.runtime.onStartup.addListener(() => {
    console.log("Starting up . . . !");
    chrome.storage.local.get("status").then((st) => {
        if(st.status)
        {
            chrome.storage.local.get("redirectlist").then((rl) => {
                const redList = rl.redirectlist.data;
                console.log(redList);
                start(redList);
            })
        }
    });
});

chrome.windows.onRemoved.addListener((windowID) => {
    console.log("Closing down");
    chrome.windows.getAll(function (window_list){
        if(window_list.length == 0){
        console.log("All windows have been shut down");
        }
        else
        {
            console.log(window_list.length);
        }
    });
    
});

// listner to get stored data when the data changes
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    workersCopyBlockList = message;
    sendResponse({"status" : "all good"});
    console.log(workersCopyBlockList);
});

//Listner for when the start or stop button in clicked
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.status == "start") {console.log("starting"); start(message.data);}
    else if(message.status == "stop") {console.log("stopping"); stop();}
    else if(message.status == "test") {console.log("Testing");};
    sendResponse("all good");
});

//function to get the stored data when button is clicked
function start(storedData)
{
    console.log(storedData);
    loopinterval = setInterval(myloop, 7000);
    workersCopyBlockList = JSON.parse(storedData) //some data we will be bringing forward. should be assigned here 
    chrome.storage.local.set({"status": true}).then(() => {console.log("Status saved");});
}

function stop()
{
    clearInterval(loopinterval);
    chrome.storage.local.set({"redirectlist": workersCopyBlockList}).then(() => {console.log("Data saved");});
    chrome.storage.local.set({"status": false}).then(() => {console.log("Status saved");});
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
            chrome.tabs.update(tab.id, {url : "https://www.google.com"});
        }

    } catch (error) {
        console.log("URL Not found. Switch back to a browser tab");
    }
}


