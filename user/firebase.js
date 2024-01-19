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
//getting name from the h1 tag, later to be grab from local storage...
var name=document.getElementById('name').innerText;

//adding event listeners to the form
document.getElementById('submit').addEventListener('submit',(e)=>
{
    // e.preventDefault();
    var numb_subj=getvalue("no_subj");
    var sem=getvalue("semister");
    var marks=firebase.database().ref("Marks").child(name+"/"+sem);
    //passing semister value into database
    marks.set({semister:sem});
    for(var i=1;i<Number(numb_subj)+1;i++)
    {
        //changing id name through loop, subject1, subject2, subject3.....
        var subject="subject"+i;
        var grade="grade"+i;
        var credit="credits"+i;
        //paassing id names for getting value
        var sub=getvalue(subject);
        var g=getvalue(grade);
        var c=getvalue(credit);
        //creating an object to store values dynamically
        const obj={subject:sub,credits:c,grade:g};
        //passing the object into the database
        marks.update({[subject]:obj});
    }
    window.alert("submited");
    document.getElementById('submit').reset();
});

//created function for getting elements from input fields
function getvalue(id)
{
    return document.getElementById(id).value;
}

var input_fields=document.getElementById("input_fields");//geting main div in which input fields to be added
document.getElementById("add").addEventListener('click',addfield);

//creating function for adding the input fields on button click
function addfield()
{
    var numb_subj=getvalue("no_subj");
    var i=1;
    for(;i<Number(numb_subj)+1;i++)
    {
        //changing id name through loop, subject1, subject2, subject3.....
        var subject="subject"+i;
        var grade="grade"+i;
        var credit="credits"+i;

        //the architecture must be like
        // <div>
        //     <input type="text"/>  for subject name
        //     <select name="grade">  for grades
        //         <option value="10">A+</option>
        //         <option value="9">A</option>
        //         <option value="8">B</option>
        //         .
        //         .
        //         .
        //         .
        //     </select>
        //     <input type="text"/>  for credits
        // </div>

        const sub_name=document.createElement('input');
        sub_name.type='text';
        sub_name.id=subject;
        sub_name.placeholder="subject name";

        const grade_field=document.createElement('select');
        grade_field.name='grade';
        grade_field.id=grade;

        const credit_field=document.createElement('input');
        credit_field.type='text';
        credit_field.id=credit;
        credit_field.placeholder="number of credits";

        const div=document.createElement('div');

        var opt1 = document.createElement('option');
        opt1.value = 10;
        opt1.text = 'A+';
        grade_field.appendChild(opt1);

        var opt2 = document.createElement('option');
        opt2.value = 9;
        opt2.text = 'A';
        grade_field.appendChild(opt2);

        var opt3 = document.createElement('option');
        opt3.value = 8;
        opt3.text = 'B';
        grade_field.appendChild(opt3);

        var opt4 = document.createElement('option');
        opt4.value = 7;
        opt4.text = 'C';
        grade_field.appendChild(opt4);

        var opt5 = document.createElement('option');
        opt5.value = 6;
        opt5.text = 'D';
        grade_field.appendChild(opt5);

        var opt6 = document.createElement('option');
        opt6.value = 5;
        opt6.text = 'E';
        grade_field.appendChild(opt6);

        var opt7 = document.createElement('option');
        opt7.value = 4;
        opt7.text = 'F';
        grade_field.appendChild(opt7);

        div.appendChild(sub_name);
        div.appendChild(grade_field);
        div.appendChild(credit_field);
        input_fields.appendChild(div);
    }
    //increasing i value for next subject until i value equals to number of subjects
    i++;
}

var name_ref=firebase.database().ref("Marks");//creating refernce to check whether the user add their marks previusly
name_ref.on('value',function(data)
{
    var names=data.val();
    var users=Object.keys(names);
    for(var i=0;i<users.length;i++)
    {
        try
        {
            if (users[i]===name)//comapring if the user added their marks previously
            {
                var marks=firebase.database().ref("Marks").child(name);
                marks.on('value',function(data)
                {
                    var Info=data.val();
                    keys=Object.keys(Info);
                    var CGP=0;
                    var bargraph_maindiv=document.getElementById("user_graphs_section");
                    for(var i=0;i<keys.length;i++)
                    {
                        var k=keys[i];
                        var count=Object.keys(Info[k]).length;//returns number of entries in  each semister
                        
                        const main_div=document.createElement("div");//creating main div
                        main_div.classList="flex items-center justify-center flex-col p-5";

                        const sem_value=document.createElement('p');//creating paragraph tag to display semister value
                        sem_value.innerText="Semister - "+Info[k].semister;//keeping semister value as paragraph inner text
                        sem_value.classList="p-2"
                        main_div.appendChild(sem_value);//adding semister valued paragraph inside main div

                        const subject_bargraph=document.createElement("div");
                        subject_bargraph.id="subjects_bargraph_"+i;
                        bargraph_maindiv.appendChild(subject_bargraph);//adding individual semister bargraph into bargraph div

                        var semister_title="Semister "+Info[k].semister;

                        CGP=Number(CGP)+Number(marks_field(count,Info,k,main_div,"subjects_bargraph_"+i,semister_title));//function that reutrns all the individual subject grades, credits and subject name
                        marks_section.appendChild(main_div);
                    }
                    const total_points=document.createElement('p');//creating paragraph for total GPS outside loop to overcome multiple iterations
                    total_points.innerText="Total Grade Points (CGP) - "+((Number(CGP)/Number(keys.length)).toFixed(2));
                    total_points.classList="font-bold text-lg";

                    marks_section.classList="flex items-start justify-center flex-wrap";

                    document.getElementById("total_points_section").appendChild(total_points);//adding total_points paragraph to total points section
                })
            }
            else throw "Marks not yet entered"
        }
        catch(e){}
    }
})

var marks_section=document.getElementById("marks");
//creating a function that analyse all the subject names, credit points, grades individually...
function marks_field(count,Info,k,main_div,subject_bargraph,semister_title)
{
    var TCGP=0;
    var nume=0;var denum=0;
    //creating arrays for plotting graph
    var subjects_array=[];
    var grades_array=[];
    //creating loop to get each subject, grade, credits
    for(var j=1;j<Number(count);j++)
    {
        // the architecture must be like
        // <div>
        //     <p>subject name</p>  for subject name
        //     <p>grade value</p> for grades
        //     <p>for credit value</p>  for credits
        // </div>
        const div=document.createElement("div");
        
        const sub_name=document.createElement("p");
        sub_name.innerText="Subject : "+Info[k]["subject"+j].subject;
        subjects_array.push(Info[k]["subject"+j].subject);

        const grade_value=document.createElement("p");
        grade_value.innerText="Grades : "+Info[k]["subject"+j].grade + "  Credits : "+Info[k]["subject"+j].credits;
        grades_array.push(Info[k]["subject"+j].grade);

        nume=Number(nume)+(Number(Info[k]["subject"+j].grade)*Number(Info[k]["subject"+j].credits));//multiplying grade points and credits of each subject
        denum=Number(denum)+Number(Info[k]["subject"+j].credits);//adding all credits in each semister

        div.appendChild(sub_name);
        div.appendChild(grade_value);
        div.classList="flex items-center justify-center flex-col p-0.5";
        main_div.appendChild(div);
    }
    console.log(subjects_array,grades_array);
    const data = [{
    x:subjects_array,
    y:grades_array,
    type:"bar",
    orientation:"v",
    marker: {color:"rgba(100,20,155,0.6)"},
    width: 0.5
    }];

    const layout = {
        title:semister_title,
        barmode: 'stack',
        bargap: 0.05,
        xaxis:{title:"Semister Sujects"},
        yaxis:{title:"Grades Scored",range:[0,10]}
    };

    Plotly.newPlot(subject_bargraph, data, layout,{displayModeBar: false});
    const SGPA=  document.createElement("p");//creating paragraph tag to view the semister grade points
    TCGP=(Number(nume)/Number(denum)).toFixed(2);//toFixed() used to show number of decimal points
    SGPA.innerText="SGPA : "+(Number(nume)/Number(denum)).toFixed(2);
    // grade points formula :
    // sum of ( sub grade point * sub credits ) / sum of all credits
    main_div.appendChild(SGPA);
    return TCGP;
}