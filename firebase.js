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
    //resetting the form after submitting
    var ref=firebase.database().ref("Info/"+name);
    ref.on("value",function(data)
    {
        //accessing values inside "Info/<name>" object
        var Info=data.val();
        if(Info.name===name & Info.password===pass & Info.email===email)
        {
            swal("Already registered...","","error");
        }
        else
        {
 //passing values to database
    details.set(
        {
        name: name,
        email: email,
        password: pass,
        gender:gender,
        });
            swal("Registered successfully...","","success");
        }
    })
    document.getElementById("Signup").reset();  
})
//function to check if user is already logged in or not
login.addEventListener("submit",(e)=>
{
    e.preventDefault();
    var name=document.getElementById("lname").value;
    var pass=document.getElementById("lpassword").value;
    var email=document.getElementById("lemail").value;
    user=name;
    //creating reference for data inside "Info" object
    var ref=firebase.database().ref("Info/"+name);
    ref.on("value",function(data)
    {
        //accessing values inside "Info/<name>" object
        var Info=data.val();
        if(Info.name===name & Info.password===pass)
        {
            swal("Login successfully...","","success");
            window.location.assign("user/index.html","_blank");
            localStorage.setItem('user-name',name);
            localStorage.setItem('user-email',email);
        }
        else
        {
            swal("Register to login...","","error");
        }
    })
})
