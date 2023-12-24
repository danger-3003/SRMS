var login_btn=document.getElementById("login");
var login=document.getElementById("Login");

login.addEventListener("submit",(e)=>
{
    e.preventDefault();
    if (document.getElementById("lname").value == "sumanth narem")
    {
        location.replace("/user/");
    }
})
