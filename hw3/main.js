let i=0,num,first=1;

if(first==1){
    myFunction(2);
}

function newgame(){
    i=0;
    first=0;
    num = Math.random()*100;
    num = Math.floor(num)+1;
    document.getElementById("numb").disabled = false;
    document.getElementsByClassName("btn btn-app").disabled = false;
    myFunction(0);
    console.log(num);
}

function myFunction(n){
    let text;
    let key = document.getElementById("numb").value;
    if( n==1 ){
        if( i>=0 && i<=9 ){
            if( key>=1 && key<=100){
                if( key < num ){
                    text = "last number was too low";
                    i++;
                    document.getElementById("ans").innerHTML = text;
                }
                else if ( key > num ){
                    text = "last number was too high";
                    i++;
                    document.getElementById("ans").innerHTML = text;
                }
                else if ( key == num ){
                    text = "Your Number is Correct!!!";
                    document.getElementById("numb").disabled = true;
                    document.getElementById("ans").innerHTML = "";
                    document.getElementById("ans1").innerHTML = text;
                    
                }
                else{
                    text = "Input number please";
                }
            }
            else{
                text = "Please enter number between 1 to 100 only !!";
                document.getElementById("ans").innerHTML = text;
            }
            document.getElementById("preans").innerHTML = "Previous number : " + key;
            //document.getElementById("ans").innerHTML = text;
            document.getElementById("turn").innerHTML ="Round : " + (0+i);
        }
        if( i==10 ){
            document.getElementById("ans").innerHTML = "Game Over!!!";
            document.getElementById("numb").disabled = true;
            document.getElementsByClassName("btn btn-app").disabled = true;
           
        }
    }
    else if( n == 0){
        text = "";
        key = "";
        document.getElementById("preans").innerHTML = "Previous number : " + key;
        document.getElementById("ans").innerHTML = text;
        document.getElementById("ans1").innerHTML = text;
        document.getElementById("turn").innerHTML ="Round : " + (0+i);
    }
    else{
        document.getElementById("numb").disabled = true;
        document.getElementsByClassName("btn btn-app").disabled = true;
    }
}