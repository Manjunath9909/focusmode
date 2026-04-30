
document.addEventListener("DOMContentLoaded", loaded)

function loaded()
{
    const butt = document.getElementById("mainbutton");
    butt.addEventListener("click", consoleme);
}

function consoleme()
{
    //trigger the focus flow here
    console.log("hello");
}
