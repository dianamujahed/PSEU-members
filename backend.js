// When the user clicks on div, open the popup
function show() {
  console.log("clicked");
  let popup = document.getElementById("item-detail");
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
  renderMembersInHtml();
}
else {
  console.log('local storage is empty');

}


//render members in the html
function renderMembersInHtml() {
  let i;
  let html = "";
  for (i = 0; i < members.length; i++) {
    html += `<div class="item" id="${i}">
  <button class="delete">
      &#8722;
  </button>
  <div class="info" onclick="show()">
      <h3>${members[i].name}</h3>
      <a href="#">
          <span>
          ${members[i].email}
          </span>
          /
          <span>
          ${members[i].major}
          </span>
          /
          <span>
          ${members[i].role}
          </span>
      </a>
      <p>${members[i].pio}
      </p>
  </div>
</div>
</div>`;
  }
  if (html) {
    document.getElementById("items").innerHTML = html;
  }
  let number = members.length;
  document.getElementById("number").innerHTML = number + " ITEMS";
};


//save members array  to local storage 
function saveTOlocalStorage() {
  let json = JSON.stringify(members);
  localStorage.setItem('dataBase', json);
  console.log(localStorage.getItem('dataBase'));
};

//validation for inputs
function validateInputs() {
  return document.getElementById("name").checkValidity() && document.getElementById("email").checkValidity()
    && document.getElementById("major").checkValidity() && document.getElementById("role").checkValidity()
    && document.getElementById("pio").checkValidity();
};


//check email validity
function checkEmail(Email) {
  return Email.email !== document.getElementById("email").value;
}


//add members to members array
function addMember() {
  if (!validateInputs()) {
    document.getElementById("invalid").innerHTML = "all fields are required";
  }
  else if (!members.every(checkEmail)) {
    document.getElementById("invalid").innerHTML = "email already taken";
  }
  else {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let major = document.getElementById("major").value;
    let role = document.getElementById("role").value;
    let pio = document.getElementById("pio").value;
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
    document.getElementById("invalid").innerHTML = "";//in case the previous trial is invalid
  }
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




