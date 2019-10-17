
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
	renderMembersInHtml(members);
}
else {
	console.log('local storage is empty');

}

let checkEmail = (targetEmail, members) => {
	return members.some((member) => member.email.toLowerCase() == targetEmail.toLowerCase())
}

//render members in the html
function renderMembersInHtml(membersArr) {
	let i;
	let html = "";
	for (i = 0; i < membersArr.length; i++) {
		html += `<div class="item" id="${membersArr[i].email}">
  <button class="delete" data-id = "${membersArr[i].email}" onclick="deleteMember(this)">
      &#8722;
  </button>
  <div class="info" onclick="show()">
      <h3>${membersArr[i].name}</h3>
      <a href="#">
          <span>
          ${membersArr[i].email}
          </span>
          /
          <span>
          ${membersArr[i].major}
          </span>
          /
          <span>
          ${membersArr[i].role}
          </span>
      </a>
      <p>${membersArr[i].pio}
      </p>
  </div>
</div>
`;
	}


	if (html)
		document.getElementById("items").innerHTML = html;

	let number = membersArr.length;
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



//add members to members array
function addMember() {
	if (!validateInputs()) {
		document.getElementById("invalid").innerHTML = "all fields are required";
	}
	else if (checkEmail(document.getElementById("email").value, members)) {

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
		renderMembersInHtml(members);
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


//this function is for deleting member from the members array and as well from the local storage
function deleteMember(button) {
	id = button.attributes["data-id"].nodeValue;
	members.splice(members.findIndex(element => id == element.email), 1);
	saveTOlocalStorage();
	renderMembersInHtml(members);

}

//first filter 
function changeFunc() {
	let filter_1 = document.getElementById("filter1");
	let selectedValue = filter_1.options[filter_1.selectedIndex].value;

	let sortedArray = members.slice();//cloning members array

	if (selectedValue == "A-Z") {
		sortedArray.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1);
	}
	else if (selectedValue == "Z-A") {
		sortedArray.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase()) ? 1 : -1);
	}
	else if (selectedValue == "newist") {
		sortedArray.sort((a, b) => (a.date < b.date) ? 1 : -1);

	}
	else if (selectedValue == "oldest") {
		sortedArray.sort((a, b) => (a.date > b.date) ? 1 : -1);
	}
	else if (selectedValue == "original") {
		sortedArray = members.slice();

	}
	renderMembersInHtml(sortedArray);

}
