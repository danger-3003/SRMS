var login_block=document.getElementById("login_block");
var sign_up_block=document.getElementById("sign_up_block");

var signup_btn=document.getElementById("tosignup");
var login_btn=document.getElementById("tologin");

signup_btn.addEventListener("click",()=>
{
    login_block.classList.replace("left-[0%]","left-[100%]");
    sign_up_block.classList.replace("right-[100%]","right-[0%]");
})

login_btn.addEventListener("click",()=>
{
    login_block.classList.replace("left-[100%]","left-[0%]");
    sign_up_block.classList.replace("right-[0%]","right-[100%]");
})