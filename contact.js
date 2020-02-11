let e = false;
let m = 0.0
let f = 0.0
let o = 0.0
let count = 0.0

let firebaseConfig = {
    apiKey: "AIzaSyDTE-zKzPgQG_OYIvEF0-vJhOKNK--a8FU",
    authDomain: "localhost",
    databaseURL: "https://lab5-8d6d0.firebaseio.com",
    projectId: "lab5-8d6d0",
    storageBucket: "lab5-8d6d0.appspot.com",
    messagingSenderId: "835377672601",
    appId: "1:835377672601:web:13a57b9ccce610a3fde308",
    measurementId: "G-VSE6KS82KN"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

$('#save').click(()=> {
    e = false
    let first = document.getElementById("first").value;
    let last = document.getElementById("last").value;
    let sex = $('input[name=gender]:checked', '#contact').val();
    let email = document.getElementById("email").value;
    let detail = document.getElementById("detail").value;

    //checked validation


    if(!(first.match('^[a-zA-Z]{1,16}$')) || first == "") {
        console.log('F');
        e = true;
        document.querySelector('#fe').textContent = "Please enter a valid First name."
    }else{
        document.querySelector('#fe').textContent = ""

    }

    if(!(last.match('^[a-zA-Z]{1,16}$')) || last == "") {
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


    db.collection("users")
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

db.collection('users').orderBy("Name").onSnapshot(doc =>{
    let table = $('.ccc')[0]
    
    // document.querySelectorAll("tbody tr").forEach(item => item.remove())
    $(".ccc tr").remove()
    doc.forEach(item => { 
        let row = table.insertRow(-1)
        let firstCell = row.insertCell(0)
        let secoundCell = row.insertCell(1)
        let thirdCell = row.insertCell(2)
        let str = String(item.data().Email)
        let buff = ""
        
        for(i=0;i<str.length;i++){
            if(i==0|| str[i]=='@'|| str[i]=='.'){
                buff += str[i]
            }else buff +='x'
        }
        firstCell.textContent = item.data().Name
        if(item.data().Gender == 1){
            secoundCell.textContent = "male";
            m++;
            count++;
        }else if(item.data().Gender == 2){
            secoundCell.textContent = "female";
            f++;
            count++;
        }else if(item.data().Gender == 3){
            secoundCell.textContent = "Other";
            o++;
            count++;
        }
        thirdCell.textContent = buff
        let options = {
            title: {
                text: "Users Gender "
            },
            
            animationEnabled: true,
            data: [{
                type: "pie",
                startAngle: 40,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}%",
                dataPoints: [
                    { y: (m/count)*100, label: "Male" },
                    { y: (f/count)*100, label: "Female" },
                    { y: (o/count)*100, label: "Other" },
                   
                ]  
            }]
        };
        $("#chartContainer").CanvasJSChart(options);
        console.log(m)
    })
    //$('.textchange').text(secoundCell)
})