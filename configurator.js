const yt = document.getElementById("youtube");
yt.addEventListener("change", handleCheckbox);

const prm = document.getElementById("primevideo");
prm.addEventListener("change", handleCheckbox);

const red = document.getElementById("reddit");
red.addEventListener("change", handleCheckbox);

const newuser = document.getElementById("newuser");
newuser.addEventListener("click", newusernow);

const customMessage = document.getElementById("custommessage");
customMessage.addEventListener("change", updateCustomMessage);

document.addEventListener("DOMContentLoaded", init)

var globalVarBlocklist = null;

/*chrome.runtime.onMessage.addListner((message, sender, sendMessage) => {
    console.log(message.request);
    if (localStorage.getItem("redirectlist")  !== null)
    {
        globalVarBlocklist = JSON.parse(localStorage.getItem("redirectlist"));
    }
    sendMessage(globalVarBlocklist);
});*/

function updateCustomMessage()
{
    const customMess = document.getElementById("custommessage").value;
    localStorage.setItem("custommessage", customMess);
}

function init()
{
    if (localStorage.getItem("redirectlist")  !== null)
    {
        globalVarBlocklist = JSON.parse(localStorage.getItem("redirectlist"));
        chrome.runtime.sendMessage(globalVarBlocklist, (response) => {console.log(response.status)});
        console.log("local storage detected");
    }
    loadmydata();
}

//for debug only for now - could be a quick reset feature later in life
function newusernow()
{
    yt.checked = false;
    prm.checked = false;
    red.checked = false;
    localStorage.setItem("redirectlist", '{"redirectlist":[]}');
    init();
}

function handleCheckbox(event)
{
    if(event.target.checked)
    {
        const val = event.target.value;
        if(!globalVarBlocklist.redirectlist.includes(val))
        {
            globalVarBlocklist.redirectlist.push(val);
            storemydata();
        }
        console.log("Added : " + event.target.value);
    }

    else
    {
        const val = event.target.value;
        if(globalVarBlocklist.redirectlist.includes(val))
        {
            const v = globalVarBlocklist.redirectlist.indexOf(val);
            globalVarBlocklist.redirectlist.splice(v, 1);
            storemydata();
        }
        console.log("Removed : " + event.target.value);
    }
}

function storemydata()
{
    localStorage.setItem("redirectlist" , JSON.stringify(globalVarBlocklist));
    informWorkers();
}

function informWorkers()
{
    chrome.runtime.sendMessage(globalVarBlocklist, (response) => {console.log(response.status)});
}

function loadmydata()
{
    const f = JSON.parse(localStorage.getItem("redirectlist"));
    const m = localStorage.getItem("custommessage");
    customMessage.value = m.trim();
    f.redirectlist.forEach(setchecks);
}

function setchecks(item, index)
{
    const target = document.getElementById(item);
    target.checked = true;
}