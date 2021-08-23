//getting data from the server with the help of following function

async function getuser(){
  const suraj= await fetch("https://611f26499771bf001785c736.mockapi.io/users")
  const userss = await suraj.json();
  console.log(userss)
  userss.forEach((value)=>design(value));
}

//creating all the necessary HTML elements which are necessary using js only and appending them to 
//body

const parentDiv = document.createElement("div")
parentDiv.setAttribute("class","container")

//function to append the data

var design = (value)=>{

  //creates profile card

const profileDiv = document.createElement("div")
profileDiv.setAttribute("class","profile")

const data = document.createElement("div")
data.setAttribute("class","image")
data.innerHTML = `<img src=${value.avatar} alt="">`

const info = document.createElement("div")
info.setAttribute("class","info")
info.innerHTML =`
<p class="name">${value.name}</p>
<p class="date">${value.createdAt}</p>

`
//creates delete and edit buttons on profile card

const btndivs = document.createElement("div")
btndivs.setAttribute("class","buttondivs")
btndivs.innerHTML=`
<button class ="btn1" onclick = "remove(${value.id})" >DELETE</button><br>
<button class ="btn2" onclick = "edit(${value.id})" >EDIT</button>
`
// finally all things are appended to the body

profileDiv.append(data , info , btndivs)
parentDiv.append(profileDiv)
document.querySelector("#people").append(parentDiv)

}

//function called because we want our data to be default whenever we ,
//refresh our page
 getuser()



//adding new user 
//whyen u click on Done after entering data in textbox this function is triggered

async function adder(){

  //gives value stored in textbox
  let personName = document.getElementById("userName").value
//gives value stored in textbox
  let personpic = document.getElementById("picture").value

//add data to our api using POST method

  document.getElementById("myForm").reset();
  const addingData = await fetch("https://611f26499771bf001785c736.mockapi.io/users",{
    method:'POST',
    body:JSON.stringify({
      name: personName,
      avatar: personpic,
      createdAt: new Date()
    }),
    headers:{
      "Content-Type":"application/json"
    }
  })

  let rate = await addingData.json()

  console.log(rate)
//refreshes our page and load new api data
  getuser()
//returns back to add people
  tear()

}

// Editing a data
//edits our data using PUT method in our API
async function edit(id){
  newForm();
  const editdata = await fetch("https://611f26499771bf001785c736.mockapi.io/users/"+ id ,
  {
    method:"PUT"
  });
  const userdata = await editdata.json();
  document.getElementById("userName").value = userdata.name
  document.getElementById("picture").value = userdata.avatar
  remove(id)
}

//THESE ARE THE html ELEMENTS CREATED WHEN U CLICK ON ADD PEOPLE

function newForm(){
  let createNew = document.querySelector("form")
createNew.innerHTML = `
<input type="text" id="userName"  placeholder ="Enter User Name" >
<input type="text" id="picture" placeholder ="Enter Photo URL"><br>
<input class= "donebtn" type="button" value="DONE" onclick="adder()">
<input class= "cancelbtn" type="button" value="CANCEL" onclick="adder()"><br>
`
}


// function validation(){
//   if(document.getElementById("userName").value="" || (document.getElementById("picture").value =" " )){
//     return true
//   }else{
//     return false
//   }
// }


//u see add people button on screen this is because of this function
function tear(){
  let returnPre = document.querySelector("form");
  returnPre.innerHTML = `
  <input class= "addbtn" type="button" value="ADD PEOPLE" onclick="newForm()"><br>
  `
}
tear();


//deleting function 
//removes the data from our api using DELETE method

async function remove(id){
  const deleteInfo = await fetch("https://611f26499771bf001785c736.mockapi.io/users/"+ id ,
  {
    method:"DELETE"
  });
  
  const user = await deleteInfo.json();
  //console added to check error if anything goes wrong again
  //console.log(user)

  //empties our section in html before loading new data
  document.body.querySelector(".container").innerHTML=``;

//refreshes and gives us new data
  getuser()
}
