var login_page=document.getElementById("Login");
var signup_page=document.getElementById("Signup");
var signup_btn=document.getElementById("tosignuppage");
var login_btn=document.getElementById("tologinpage");

// console.log(login_page,signup_page);
signup_btn.addEventListener('click',()=>
{
    signup_page.classList.replace("left-[130%]","left-0");
    login_page.classList.replace("right-[0%]","right-[130%]");
})
login_btn.addEventListener('click',()=>{
    signup_page.classList.replace("left-0","left-[130%]");
    login_page.classList.replace("right-[130%]","right-[0%]");
})