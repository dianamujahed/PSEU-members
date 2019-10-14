// When the user clicks on div, open the popup
function show() {
  let popup = document.getElementById("item");
  popup.classList.toggle("show");
}

//this class is for dealing with database
class Member {
  constructor(name, email, major, role, pio, date) {
    this.name = name;
    this.email = email;
    this.major = major;
    this.role = role;
    this.pio = pio;
    this.date = date;
  }
}

//array for storing members
let members = [];

//check local storage
if (localStorage.getItem("dataBase") === null) {
  console.log('local storage is empty');
}
else {
  members = JSON.parse(localStorage['dataBase']);
}


//render members in the html
function renderMembersInHtml(){
  console.log('renderd');

};


//save members array  to local storage 
function saveTOlocalStorage(){
let json=JSON.stringify(members);
localStorage['databBase']=json;
console.log(localStorage['databBase']);
};



//add members to members array
function addMember() {
  let name = document.getElementsByName("name")[0].value;
  let email = document.getElementsByName("email")[0].value;
  let major = document.getElementsByName("major")[0].value;
  let role = document.getElementsByName("role")[0].value;
  let pio = document.getElementsByName("pio")[0].value;
  let dateTime = new Date();//current dateTime
  let member = new Member(name, email, major, role, pio, dateTime);

  //check index
  let index = document.getElementById("index").value;
  if (index !== "") {
    members.splice(index, 0, member)
    console.log(members);

  }
  else if (document.getElementById("bottom").checked == true)
    members.push(member);
  else
    members.unshift(member);


  //console.log(members);
  renderMembersInHtml();
  saveTOlocalStorage();
}

//this function is for disablING index if add to buttom checkbox is selected 
document.getElementById("bottom").onchange = function () {
  let checkbox = document.getElementById("bottom");
  if (checkbox.checked == true) {
    document.getElementById("index").value = "";
    document.getElementById("index").setAttribute("disabled", "disabled")
  }
  else {
    document.getElementById("index").removeAttribute("disabled")
  }

};




