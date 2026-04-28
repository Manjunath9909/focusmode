
const butt = document.getElementById("mainbutton");
butt.addEventListener("click", consoleme);

const butt1 = document.getElementById("load");
butt1.addEventListener("click", loadmydata);

const butt2 = document.getElementById("save");
butt2.addEventListener("click", storemydata);


function consoleme()
{
    //trigger the focus flow here
    console.log("hello");
}

function storemydata()
{
    window.localStorage.setItem('redirectlist', '{"redirectlist" : ["youtube.com", "primevideo.com"]}');
}

function loadmydata()
{
    const f = JSON.parse(localStorage.getItem("redirectlist"))
    f.redirectlist.forEach(printem)
}

function printem(item, index)
{
    console.log(item);
}
