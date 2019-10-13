
//this function is for disablING index if add to buttom checkbox is selectd 
  document.getElementById("bottom").onchange = function () 
  {
    let checkbox=document.getElementById("bottom");
    if(checkbox.checked ==true)
    {
      document.getElementById("index").value = "";
      document.getElementById("index").setAttribute("disabled", "disabled")
    }
    else
    {
      document.getElementById("index").removeAttribute("disabled")
    }
    
  };

  document.getElementById("index").onchange = function ()
  {
    document.getElementById("bottom").checked = false;
    
  };

  


// When the user clicks on div, open the popup
function show() {
  let popup = document.getElementById("item");
  popup.classList.toggle("show");
}

//this class is for dealing with database
class Member {
  constructor(name, email, major, role, pio) {
    this.name = name;
    this.email=email;
    this.major=major;
    this.role=role;
    this.pio=pio;
  }
}

//array for storing members
let members=[];

//add members to members array
function addMember()
{
  let name=document.getElementsByName("name")[0].value;
  let email=document.getElementsByName("email")[0].value;
  let major=document.getElementsByName("major")[0].value;
  let role=document.getElementsByName("role")[0].value;
  let pio=document.getElementsByName("pio")[0].value;
  let member=new Member(name,email,major,role,pio);

//check index
let index=document.getElementById("index").value;



  members.push(member);
  console.log(members);
}
let index=document.getElementById("index").value;



console.log(index);

