var appStatus = false;

document.addEventListener("DOMContentLoaded", loaded);

// build UI here and do all of init
function loaded()
{
    const butt = document.getElementById("mainbutton");
    butt.addEventListener("click", consoleme);
    if(localStorage.getItem("status") == null)
    {
        localStorage.setItem("status", '{"status" : false}')
    }
    
    if(localStorage.getItem("status") !== null)
    {
        const s1 = JSON.parse(localStorage.getItem("status"));
        if (s1.status) {butt.innerHTML = "RELAX";}
        else {butt.innerHTML = "FOCUS";}
    }
}

//to handle the button press
function consoleme()
{
    const status = JSON.parse(localStorage.getItem("status"));
    appStatus = status.status;
    if (appStatus)
    {
        //stop funcction call
        localStorage.setItem("status", '{"status" : false}')
        document.getElementById("mainbutton").innerHTML = "FOCUS";
        chrome.runtime.sendMessage({status : "stop", data : localStorage.getItem("redirectlist")}, (response) => {console.log(response)});
    }
    else
    {
        //start function call
        localStorage.setItem("status", '{"status" : true}')
        document.getElementById("mainbutton").innerHTML = "RELAX";
        chrome.runtime.sendMessage({status : "start", data : localStorage.getItem("redirectlist")}, (response) => {console.log(response)});
    }
}