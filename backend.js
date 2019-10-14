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
if (localStorage.getItem('dataBase')) {

  members = JSON.parse(localStorage.getItem('dataBase'));
}
else {
  console.log('local storage is empty');
}


//render members in the html
function renderMembersInHtml() {
  let i;
for (i = 0; i < members.length; i++) {
  html += members[i] + "<br>";
}
  let html =  `<button class="delete">
  &#8722;
</button>
<div class="info" onclick="show()">
      <h3>Diana mujahed</h3>
      <a href="#">
          <span>
              diana.muj98@gmail.com
          </span>
          /
          <span>
              computer science
          </span>
          /
          <span>
              Front-end developer
          </span>
      </a>
      <p>fourth year computer science student at palestine polyhticnic university
      </p>
  </div> `;
  document.getElementById("totalTime").innerHTML = "5:00";
};


//save members array  to local storage 
function saveTOlocalStorage() {
  let json = JSON.stringify(members);
  localStorage.setItem('dataBase',json);
  console.log(localStorage.getItem('dataBase'));
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




