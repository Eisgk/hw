// index.js

let e = false;

let M=0;
let F=0;
let O=0;

let firebaseConfig = {
    apiKey: "AIzaSyCpIlcmNOoB3yuGF4D70wPebYiGPgbK_VA",
    authDomain: "localhost",
    projectId: "test-c35f1",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  let db = firebase.firestore();
console.log('Hi');


$('#save').click(()=> {
    e = false
    let first = document.getElementById("first").value;
    let last = document.getElementById("last").value;
    let sex = $('input[name=gender]:checked', '#contact').val();
    let email = document.getElementById("email").value;
    let detail = document.getElementById("detail").value;

    //checked validation


    if(!(first.match('^[a-zA-Z]{3,16}$')) || first == "") {
        console.log('F');
        e = true;
        document.querySelector('#fe').textContent = "Please enter a valid First name."
    }else{
        document.querySelector('#fe').textContent = ""

    }

    if(!(last.match('^[a-zA-Z]{3,16}$')) || last == "") {
        console.log('L');
        e = true;
        document.querySelector('#le').textContent = "Please enter a valid Last name."
    }else{
        document.querySelector('#le').textContent = ""

    }

    function validateEmail($email) {
        let emailReg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z]{2,4})+$/;
        return emailReg.test( $email );
      }

    if( !validateEmail(email) || email == "") {
         console.log('email'); 
         document.querySelector('#ee').textContent = "Please enter a valid Email Address."

         e = true;
    }else{
        document.querySelector('#ee').textContent = ""

    }



    if(e){
        console.log('error');
        document.querySelector('#se').textContent = "Please enter a valid Info."

    }else{
        document.querySelector('#se').textContent = ""


    db.collection("user")
    .add({

        Name: first + " " + last,
        Gender: sex,
        Email: email,
        Detail: detail,

    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        
        console.log(first);
        console.log(last);
        console.log(sex);
        console.log(email);
        console.log(detail);
        
        $('#first').val('')
        $('#last').val('')
        $('input[id="male"]').prop('checked', true);
        $('#email').val('')
        $('#detail').val('')
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

    }
    
})

db.collection('user').orderBy("Name").onSnapshot(doc =>{
    let table = $('tbody')[0]
    // document.querySelectorAll("tbody tr").forEach(item => item.remove())
    $("tbody tr").remove()
    // gpa = 0
    // credit = 0
    doc.forEach(item => { 
        let row = table.insertRow(-1)
        let firstCell = row.insertCell(0)
        let secoundCell = row.insertCell(1)
        let thirdCell = row.insertCell(2)
        let str = String(item.data().Email)
        let mail = ""
        
        for (let i = 0; i < str.length; i++) {
            if (i==0||str[i]=='@'||str[i]=='.') {
                mail += str[i]
            } else {
                mail +='x'
            }
            
        }
        firstCell.textContent = item.data().Name
        if(item.data().Gender == 1){
            secoundCell.textContent = "Male";
            M++;
        }else if(item.data().Gender == 2){
            secoundCell.textContent = "Female";
            F++;
        }else if(item.data().Gender == 3){
            secoundCell.textContent = "Other";
            O++;
        }
        thirdCell.textContent = mail

        console.log(M)

        //chart

        let options = {
            title: {
                text: "User Gender Ratio in Website"
            },
            subtitles: [{
                text: "As of February, 2020"
            }],
            animationEnabled: true,
            data: [{
                type: "pie",
                startAngle: 40,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label}  - {y}",
                dataPoints: [
                    { y: M, label: "Male" },
                    { y: F, label: "Female" },
                    { y: O, label: "Others" }
                ]
            }]
        };
        $("#chartContainer").CanvasJSChart(options);
        

  
    })
    M = 0;
    F = 0;
    O = 0;

})

