var signup = document.getElementById("signup");
var login_btn=document.getElementById("login");
var login=document.getElementById("Login");
//creating firebase config, directly copying and pasting from firebase console...
const firebaseConfig = {
    apiKey: "AIzaSyASRp-8cRSseFNCF63U4o3nppHt0Os3t-8",
    authDomain: "srms-23af5.firebaseapp.com",
    databaseURL: "https://srms-23af5-default-rtdb.firebaseio.com",
    projectId: "srms-23af5",
    storageBucket: "srms-23af5.appspot.com",
    messagingSenderId: "775871377100",
    appId: "1:775871377100:web:bb972cce7ee03b45ffdc69"
  };

//initializing firebase database
firebase.initializeApp(firebaseConfig);

// adding evenlistner on cicking signup button
document.getElementById("Signup").addEventListener('submit',(e)=>
{
    //removing default action of form - auto reloading
    e.preventDefault();
    //accessing values
    var name=document.getElementById('sname').value;
    var email=document.getElementById('semail').value;
    var pass=document.getElementById('spassword').value;
    //accessing value from radio buttons
    var gender=document.querySelector('input[name="gender"]:checked').value;
    //creating reference for the person details
    var details = firebase.database().ref("Info").child(name);
    //passing values to database
    details.set(
        {
        name: name,
        email: email,
        password: pass,
        gender:gender,
        });
    //resetting the form after submitting
    swal("Registered successfully...","","success");
    document.getElementById("Signup").reset();  
})

login.addEventListener("submit",(e)=>
{
    e.preventDefault();
    var name=document.getElementById("lname").value;
    var pass=document.getElementById("lpassword").value;
    //creating reference for data inside "Info" object
    var ref=firebase.database().ref("Info/"+name);
    ref.on("value",function(data)
    {
        //accessing values inside "Info/<name>" object
        var Info=data.val();
        if(Info.name===name & Info.password===pass)
        {
            window.location.assign("user/index.html","_blank");
        }
    })
})