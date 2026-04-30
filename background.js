var workersCopyBlockList = null;
var loopinterval = setInterval(myloop, 7000)

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    workersCopyBlockList = message;
    sendResponse({"status" : "all good"});
    //console.log(workersCopyBlockList);
});

async function myloop()
{/
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
        console.log(workersCopyBlockList.redirectlist);
    } catch (error) {
        console.log("URL Not found. Switch back to a browser tab");
    }
}


