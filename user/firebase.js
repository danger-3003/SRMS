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

var name=document.getElementById('name').innerText;

document.getElementById('submit').addEventListener('submit',setdata);
function setdata(e)
{
    e.preventDefault();
    var sem=getvalue("semister");
    var marks=firebase.database().ref("Marks").child(name+"/"+sem);
    const records=[];
    for(var i=1;i<4;i++)
    {
        var subject="subject"+i;
        var grade="grade"+i;
        var credit="credits"+i;
        // console.log(subject,grade,credit);
        var sub=getvalue(subject);
        var g=getvalue(grade);
        var c=getvalue(credit);
        records.push({subject:sub,grade:g,credits:c});
    }
    marks.set({semister:sem,subject1:records[0],subject2:records[1],subject3:records[2],subject4:null});
    window.alert("submited");
    // document.getElementById('submit').reset();
}

function getvalue(id)
{
    return document.getElementById(id).value;
}