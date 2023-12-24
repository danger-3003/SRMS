var signup = document.getElementById("signup");

//creating firebase config, directly copying and pasting from firebase console...
const firebaseConfig = {
    apiKey: "AIzaSyCkgB174sESX-kReucJ7G8EJ1JMRJuQogA",
    authDomain: "srms-1a443.firebaseapp.com",
    databaseURL: "https://srms-1a443-default-rtdb.firebaseio.com",
    projectId: "srms-1a443",
    storageBucket: "srms-1a443.appspot.com",
    messagingSenderId: "744824111665",
    appId: "1:744824111665:web:85c84633cb353b828b8b10"
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
    var details = firebase.database().ref(name);
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