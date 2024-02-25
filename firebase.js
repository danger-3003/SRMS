var login=document.getElementById("Login");
var signup=document.getElementById("Signup");
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
signup.addEventListener('submit',(e)=>
{
    //removing default action of form - auto reloading
    e.preventDefault();
    //accessing values
    var name=document.getElementById('sname').value;
    var email=document.getElementById('semail').value;
    var pass=document.getElementById('spassword').value;
    var redg=document.getElementById("redg").value;
    //creating reference for the person details
    var details = firebase.database().ref("Info").child(name);
    //passing values to database 
    var ref=firebase.database().ref("Info");
    ref.on("value",function(data)
    {
        // accessing values inside "Info/<name>" object
        var Info=data.val();
        var keys=Object.keys(Info);
        if(keys.includes(name))
        {
            swal("User already registered...","","error");
            signup.reset();
        }
        else
        {
            details.set(
                {
                name: name,
                email: email,
                password: pass,
                redg:redg,
                });
            //resetting the form after submitting
            swal("Registered successfully...","","success");
            signup.reset();
        } 
    })
})
//function to check if user is already logged in or not
login.addEventListener("submit",(e)=>
{
    e.preventDefault();
    var name=document.getElementById("lname").value;
    var pass=document.getElementById("lpassword").value;
    var email=document.getElementById("lemail").value;
    //creating reference for data inside "Info" object
    var ref=firebase.database().ref("Info");
    ref.on("value",function(data)
    {
        //accessing values inside "Info/<name>" object
        var Info=data.val();
        var keys=Object.keys(Info);
        for(var i=0;i<keys.length;i++)
        {
            var k = keys[i];
            var user_name=Info[k].name;
            var user_pass=Info[k].password;
            if(user_name==name & user_pass==pass)
            {
              
                localStorage.setItem('user-name',name);
                localStorage.setItem('user-email',email);
                window.location.assign("user/");
                login.reset();
            }
            else
            {
                swal("Invalid credetials","","error");
                localStorage.setItem('user-name',name);
                localStorage.setItem('user-email',email);
                login.reset();
            }
        }
    })
})