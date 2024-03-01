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

//creating a database instance and accessing the registration number of student
var redg_no_ref=firebase.database().ref("Info/"+name+"/redg");
redg_no_ref.on('value',function(data)
{
    var redg_no=data.val();
    document.getElementById('redg_no').innerText=redg_no;
})
    
//adding submit event listeners to the form
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
        const subject_details={subject:sub,credits:c,grade:g};
        //passing the object into the database
        marks.update({[subject]:subject_details});
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
        sub_name.classList="bg-[#323955] border-b-[1px] px-2 py-1 text-white outline-none rounded-sm mx-2 my-1";
        sub_name.type='text';
        sub_name.id=subject;
        sub_name.required=true;
        sub_name.placeholder="Subject Name";

        const grade_field=document.createElement('select');
        grade_field.classList="bg-[#323955] border-b-[1px] px-2 py-1 text-white outline-none rounded-sm mx-2 my-1";
        grade_field.placeholder='Grade';
        grade_field.required=true;
        grade_field.id=grade;

        const credit_field=document.createElement('input');
        credit_field.classList="bg-[#323955] border-b-[1px] px-2 py-1 text-white outline-none rounded-sm mx-2 my-1 w-20";
        credit_field.type='text';
        credit_field.id=credit;
        credit_field.required=true;
        credit_field.placeholder="Credits";

        const div=document.createElement('div');
        div.classList="flex flex-wrap items-center justify-center"

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

var marks_section=document.getElementById("marks");
var name_ref=firebase.database().ref("Marks");//creating refernce to check whether the user add their marks previusly

name_ref.on('value',function(data)
{
    var names=data.val();
    var users=Object.keys(names);
    console.log(names[name])
    if(names[name]===undefined)
    {
        var noRecords=document.getElementById("no_records");
        var noMarks=document.getElementById("no_marks");
        var noAnalytics=document.getElementById("no_analytics");
        noRecords.innerText="No Records Found!";
        noMarks.innerText="You didn't enter any Marks...";
        noAnalytics.innerText="No reocrds found, please add Marks to activate Analytics...";
    }
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
                    semesters=Object.keys(Info);

                    var CGP=0;
                    var bargraph_maindiv=document.getElementById("user_graphs_section");
                    var semester_subject_count=0;
                    var credits_count=0;

                    //for graphs in profile section
                    var sem_GPA=[];
                    var sem_names=[];
                    var sem_percent=[];

                    //checking whether the user have any records or not
                    if (semesters.length !=0)//if the semesters count not equal to zero
                    {
                        var points_to_grade={10:"A+",9:"A",8:"B",7:"C",6:"D",5:"E",4:"F"};
                        //creating loop to iterate each semester of the
                        for(var i=0;i<semesters.length;i++)
                        {
                            var indvd_sem=semesters[i];
                            var subject_count=Object.keys(Info[indvd_sem]).length;//returns number of subjects in  each semister

                            const main_div=document.createElement("div");//creating main div for each table that contains sem number, table, SGP.
                            main_div.classList="flex items-center justify-center flex-col p-5";

                            const sem_value=document.createElement('p');//creating paragraph tag to display semister value
                            sem_value.innerText="Semister - "+Info[indvd_sem].semister;//keeping semister value as paragraph inner text
                            sem_value.classList="p-2 font-semibold text-lg"
                            main_div.appendChild(sem_value);//adding semister valued paragraph inside main div

                            const subject_bargraph=document.createElement("div");//creating a div for individual bargraph
                            subject_bargraph.id="subjects_bargraph_"+i;
                            subject_bargraph.classList="mx-10 my-5";
                            bargraph_maindiv.appendChild(subject_bargraph);//adding individual semister bargraph into bargraph div

                            var semister_title="Sem "+Info[indvd_sem].semister;//creating semester title for the bargraph and passed into the marks_field() function
                            sem_names.push(semister_title);

                            //adding number of subjects each time to the semester_subject_count -- counting the total number of subjects in all semester
                            semester_subject_count=Number(semester_subject_count)+Number(subject_count)-1;
                            SGP_and_creditCount=marks_field(subject_count,Info,indvd_sem,main_div,"subjects_bargraph_"+i,semister_title,points_to_grade);//function that reutrns all the individual subject grades, credits and subject name
                            //adding the total credits in each semester
                            credits_count=Number(credits_count)+Number(SGP_and_creditCount.credits_count);
                            //calculating Total GPA
                            CGP=Number(CGP)+Number(SGP_and_creditCount.total_points);
                            sem_GPA.push(SGP_and_creditCount.total_points);
                            sem_percent.push((Number(SGP_and_creditCount.total_points)-0.7)*10);

                            //appending the total table section into the marks_section div
                            marks_section.appendChild(main_div);
                        }
                        const total_points=document.createElement('p');//creating paragraph for total GPS outside loop to overcome multiple iterations
                        total_points.innerText="Total Grade Points (CGP) - "+((Number(CGP)/Number(semesters.length)).toFixed(2));
                        total_points.classList="font-bold text-center text-xl text-yellow-200";

                        marks_section.classList="flex items-start justify-center flex-wrap";

                        document.getElementById("total_points_section").appendChild(total_points);//adding total_points paragraph to total points section
                    
                        //bar graphs in profile section..
                        const data = [{
                                x:sem_names,
                                y:sem_GPA,
                                type:"bar",
                                orientation:"v",
                                marker: 
                                {
                                    color:"rgb(49,230,241)",
                                    borderRadius: 10
                                },
                                width: 0.5
                            }];
                        
                        const layout = {
                            title:'Score Overview',
                            barmode: 'stack',
                            bargap: 0.05,
                            margin: {l: 50, r: 10, t: 50, b: 100},
                            xaxis:{title:"Semesters"},
                            yaxis:{title:"Scores",range:[0,10]},
                            paper_bgcolor: '#323955', // set paper background color
                            plot_bgcolor: '#323955',
                            font: {
                                color: 'white' // set font color
                            }
                        };
                        Plotly.newPlot(score_overview, data, layout,{displayModeBar: false});

                        //line graph in profile section
                        var trace1 = {
                            x: sem_names,
                            y: sem_GPA,
                            name: 'GPA',
                            type: 'scatter',
                            line: {
                                color: 'rgb(49,230,241)',
                                width: 3
                            }
                          };
                          
                          var trace2 = {
                            x: sem_names,
                            y: sem_percent,
                            name: 'Percent',
                            yaxis: 'y2',
                            type: 'scatter',
                            line: {
                                color: 'rgb(49,230,0)',
                                width: 3
                            }
                          };
                          
                          var line_data = [trace1, trace2];
                          
                          var line_layout = {
                            title:'Performance Overview',
                            margin: {l: 70, r:70, t: 50, b: 70},
                            xaxis:{title:"Semesters"},
                            yaxis: {title: 'Scores',range:[0,10]},
                            yaxis2: {
                              title: 'Performance',
                              overlaying: 'y',
                              side: 'right',
                              range:[0,100]
                            },
                            font: {
                                    color: 'white' // set font color
                                },
                            paper_bgcolor: '#323955', // set paper background color
                            plot_bgcolor: '#323955',
                            showlegend:false
                          };
                          
                          Plotly.newPlot('performance_overview', line_data, line_layout,{displayModeBar: false});
                    }
                    else
                    {
                        marks_section.innerText="No records found...";
                    }
                    document.getElementById("semester_count").innerText=semesters.length;//displaying the total semesters in the profile section
                    document.getElementById("subjects_count").innerText=semester_subject_count;//displaying the total count of subjects in the profile section
                    document.getElementById("credits").innerText=credits_count;//displaying the total credits in the profile section
                    //displaying the total CGPA and total percentage in profile secion
                    document.getElementById("CGPA").innerText=(Number(CGP)/Number(semesters.length)).toFixed(2);
                    document.getElementById("percentage").innerText=((Number(CGP)/Number(semesters.length)).toFixed(2)-0.7).toFixed(2)*10+"%";
                })
            }
            else throw "user not found"
        }
        catch(e){}
    }
})
//creating a function that analyse all the subject names, credit points, grades, bargraphs individually...
function marks_field(subject_count,Info,indvd_sem,main_div,subject_bargraph,semister_title,points_to_grade)
{
    var TCGP=0;
    var credit_count=0;
    var nume=0;var denum=0;

    //creating arrays for plotting graph
    var subjects_array=[];
    var grades_array=[];
    
    // creating a table to store marks in an organised way
    const table=document.createElement("table");
        table.classList="border border-slate-500 rounded overflow-hidden border-collapse";

        const tr=document.createElement("tr");//creating a table row 1st
        const td1=document.createElement("td");//creating a 1st row 1st column cell and adding text
        td1.innerText="Subject";
        td1.classList="font-bold bg-[#484F6B] text-white p-2"
        const td2=document.createElement("td");//creating a 1st row 2nd column cell and adding text
        td2.innerText="Grade";
        td2.classList="font-bold bg-[#484F6B] text-white"
        const td3=document.createElement("td");//creating a 1st row 3rd column cell and adding text
        td3.innerText="Credits";
        td3.classList="font-bold bg-[#484F6B] text-white"

        //adding each cell to the table row
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        //adding the row to the table
        table.appendChild(tr);
    //creating loop to get each subject, grade, credits
    for(var j=1;j<Number(subject_count);j++)
    {
        // the architecture must be like
        // <div>
            // <table>
            //        <tr>
            //             <td>Subject</td>
            //             <td>Grade</td>
            //             <td>Credits</td>
            //         </tr>
            //         <tr>
            //             <td>subj_1</td>
            //             <td>grade_1</td>
            //             <td>credit_1</td>
            //         </tr>
            //         .
            //         .
            //         .
            //         .
            //         .
            // </table>
        // </div>
        
        const record=document.createElement("tr");
        const sub_name=document.createElement("td");
        sub_name.innerText=Info[indvd_sem]["subject"+j].subject;
        subjects_array.push(Info[indvd_sem]["subject"+j].subject);

        const grade_value=document.createElement("td");
        grade_value.innerText=points_to_grade[Info[indvd_sem]["subject"+j].grade];
        grades_array.push(Info[indvd_sem]["subject"+j].grade);

        const credit_value=document.createElement("td");
        credit_value.innerText=Info[indvd_sem]["subject"+j].credits;

        nume=Number(nume)+(Number(Info[indvd_sem]["subject"+j].grade)*Number(Info[indvd_sem]["subject"+j].credits));//multiplying grade points and credits of each subject
        denum=Number(denum)+Number(Info[indvd_sem]["subject"+j].credits);//adding all credits in each semister

        //adding the subject_name, grade_value, credit_value to the record - row
        record.appendChild(sub_name);
        record.appendChild(grade_value);
        record.appendChild(credit_value);

        //adding the record - row to the table
        table.appendChild(record);
        main_div.appendChild(table);
        
        if (Info[indvd_sem]["subject"+j].grade<5)//skipping the credit value if he/she fails a subject -- F=5
        {
            credit_count=Number(credit_count)+0;
        }
        else//adding the credit value if he/she pass
        {
            credit_count=Number(credit_count)+Number(Info[indvd_sem]["subject"+j].credits);
        }
    }
    const data = [{
    x:subjects_array,
    y:grades_array,
    type:"bar",
    orientation:"v",
    marker: 
    {
        color:"rgb(49,230,241)",
        borderRadius: 10
    },
    width: 0.5
    }];

    const layout = {
        title:semister_title,
        barmode: 'stack',
        bargap: 0.05,
        margin: {l: 70, r: 40, t: 50, b: 100},
        xaxis:{title:"Semester Sujects"},
        yaxis:{title:"Grades Scored",range:[0,10]},
        paper_bgcolor: '#323955', // set paper background color
        plot_bgcolor: '#323955',
        borderRadius: 100,
        font: {
            color: 'white' // set font color
        }
    };

    Plotly.newPlot(subject_bargraph, data, layout,{displayModeBar: false});
    const SGPA=  document.createElement("p");//creating paragraph tag to display the semister grade points
    SGPA.innerText="SGPA : "+(Number(nume)/Number(denum)).toFixed(2);
    SGPA.classList="font-medium p-2";// grade points formula : sum of ( sub_grade_point * sub_credits ) / sum_of_all_credits
    main_div.appendChild(SGPA);

    //calculating total grade points
    TCGP=(Number(nume)/Number(denum)).toFixed(2);//toFixed() used to show 2 decimal points
    return {total_points:TCGP,credits_count:credit_count};
}
