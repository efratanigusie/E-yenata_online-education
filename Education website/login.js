let User_Email = " "


async function signUp() { 
    // e.preventDefault();
    var n_email=document.getElementById("email").value;
    var fname=document.getElementById("fname").value;
    var pass=document.getElementById("password").value;
    var lname=document.getElementById("lname").value;
    var response= await fetch('http://localhost:3000/auth/signup',{ method:'Post',body:JSON.stringify({
        email:n_email,
        password:pass,
        firstName:fname,
        lastName:lname
    }),
        headers:{'Content-Type':'application/json'}
    }).then((response) => response.json())
    .then((data)=> console.log(data))
    .catch((err)=>{
    console.log(err)})

    // const data=response.json();

}
async function signIn() { 
    var n_email=document.getElementById("email").value;
    var pass=document.getElementById("password").value;
    var response = await fetch('http://localhost:3000/auth/signin',{ method:'Post',body:JSON.stringify({
        email:n_email,
        password:pass,
        
    }),
    headers:{'Content-Type':'application/json'}

});
const data = response.json();
User_Email = n_email;
alert(data)
// if(data){
//     alert(data)
//     alert("sorry")
// }else{
//     alert(data)
//     window.location.href="index.html"
    
// }

// if (!data){
//     alert("not ")
// }else{
//     alert(data)
//   alert("it is working" )
//   window.location.href="index.html"
// }

// if (data.error()){
//     alert("error password")
// }else{
//     alert(data)
//     window.location.href="index.html";
// }
// .catch((err))=>{
//     console.log(error)
// }

}

// signUp();


async function enroll(){
    if (User_Email == " "){
        window.location.href="login.html";
    }
    else{
        var response = await fetch('http://localhost:3000/auth/signin',{ method:'Post',body:JSON.stringify({
            User_email:User_Email,
            
        }),
        headers:{'Content-Type':'application/json'}
    
    });
    }
}



// const response= await fetch("http://localhost:3000/auth/signup", 
// {
//     Method:"POST",
//     // headers:{
//     //     Accept :"application/json, text/plain, */*",
//     //     "Content-type":"application/json",
//     // },
//     body:JSON.stringify({
//         email:n_email,
//         password:pass,
//         firstName:fname,
//         lastName:lname
//     }),headers:{'Content-Type':'application/json'}
    

// })
// .then((response)=>response.json())
// .then((data)=>{
//     alert(data)})