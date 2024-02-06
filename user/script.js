var name=localStorage.getItem('user-name');
var email=localStorage.getItem('user-email');
document.getElementById('name').innerText=name;
// document.getElementById('email').innerText=email;

var slideUp = { delay:1,easing:"ease-in-out",interval:0,scale:0.90,resert:true};

ScrollReveal().reveal('.slide-up', slideUp);

var bars_button=document.getElementById("bars");
var menu=document.getElementById("toggle_menu");

bars_button.addEventListener("click",()=>
{
    if(bars_button.classList.contains("fa-bars"))
    {
        bars_button.classList.replace("fa-bars","fa-times");
        menu.classList.replace("-left-40","left-0");
    }
    else
    {
        bars_button.classList.replace("fa-times","fa-bars");
        menu.classList.replace("left-0","-left-40");
    }
})
document.getElementById("logout").addEventListener("click",()=>
{
    localStorage.setItem('user-name',null);
    localStorage.setItem('user-email',null);
})