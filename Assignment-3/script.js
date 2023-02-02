//Title constructor function that creates a Title object
function Title(t1) 
{ this.mytitle = t1;
}

Title.prototype.getName = function () 
{ 
return (this.mytitle);
}

var socialMedia = {
  facebook : 'http://facebook.com',
  twitter: 'http://twitter.com',
  flickr: 'http://flickr.com',
  youtube: 'http://youtube.com'
};

var t = new Title("CONNECT WITH ME!");
var noOfRows = 3;
var noOfCheckCounts = 0;

headerValues = ['', 'STUDENT', 'ADVISOR', 'AWARD STATUS', 'SEMESTER', 'TYPE', 'BUDGET', 'PERCENTAGE', 'DELETE', 'EDIT'];
tableRowValues = [' ', 'Student ', 'Teacher ', 'Approved', 'Fall', 'TA', '78787', '100%', '<button onclick="deleteStudent(this)" class = "deleteButton">Delete</button>', '<button onclick="editStudent(this)" class = "editButton" >Edit</button>']

function hideElement(val) {
  var lowestRow = val.parentNode.parentNode.nextSibling.nextSibling;
  console.log(lowestRow);
  if (lowestRow.style.display == "table-row") {
    lowestRow.style.display = "none";
  } else {
    lowestRow.style.display = "table-row";
  }
}
function hideDynamic(val) {
  var lowestRow = val.parentNode.parentNode.nextSibling;
  console.log(lowestRow);
  if (lowestRow.style.display == "table-row") {
    lowestRow.style.display = "none";
  } else {
    lowestRow.style.display = "table-row";
  }
}
function addNewStudent() {
  let table = document.getElementById('myTable');
  let rowCount = table.rows.length;
  let tr = table.insertRow(rowCount);
  const arrayForRow = [];
  for (let i = 0; i < headerValues.length; i++) {
    arrayForRow.push(tr.insertCell(i));
  }
  noOfRows += 1;
  arrayForRow[0].innerHTML = '<input type="checkbox"  onchange="changeRowStyleDynamic(this)" /><br /><br /><img src="down.png" width="25px" onclick="hideDynamic(this)"/>'
  arrayForRow[1].innerHTML = tableRowValues[1] + (noOfRows);
  arrayForRow[2].innerHTML = tableRowValues[2] + (noOfRows);
  arrayForRow[3].innerHTML = tableRowValues[3];
  arrayForRow[4].innerHTML = tableRowValues[4];
  arrayForRow[5].innerHTML = tableRowValues[5];
  arrayForRow[6].innerHTML = tableRowValues[6];
  arrayForRow[7].innerHTML = tableRowValues[7];
  arrayForRow[8].innerHTML = tableRowValues[8];
  arrayForRow[8].className = "hide_button";
  arrayForRow[9].innerHTML = tableRowValues[9];
  arrayForRow[9].className = "hide_button";

  if (noOfCheckCounts > 0) {
    arrayForRow[8].style.display = "table-cell";
    arrayForRow[9].style.display = "table-cell";
  }

  var nxtrow = table.insertRow(rowCount + 1);
  nxtrow.className = "dropDownTextArea";
  var cell = nxtrow.insertCell(0);
  cell.innerHTML = '<td >Advisor:<br /><br />Award Details<br />Summer 1-2014(TA)<br />Budget Number: <br />Tuition Number: <br />Comments:<br /><br /><br />Award Status:<br /><br /><br /></td>';
  cell.colSpan = 8;

  var nxtCell = nxtrow.insertCell(1);
  nxtCell.className = "hide_button";
  nxtCell.colSpan = 2;

  alert("New Student: " + arrayForRow[1].innerHTML + " added successfully");
}
function deleteStudent(val) {
  let r = val.parentNode.parentNode.rowIndex;
  let table = document.getElementById('myTable');

  table.deleteRow(r + 1);
  table.deleteRow(r);
  noOfCheckCounts--;
  if (r == table.rows.length) {
    let c = table.lastElementChild.lastElementChild.previousElementSibling;
    if (c != null) {
      let z = table.lastElementChild.lastElementChild.previousElementSibling.firstElementChild.nextElementSibling.innerHTML;
      noOfRows = parseInt(z.slice(-1));
    } else {
      noOfRows = 0;
    }

  }
  let x = document.getElementsByClassName("hide_button");
  if (noOfCheckCounts == 0) {
    for (let i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
  }
  if (noOfCheckCounts > 0) {
    let z = document.getElementById("button");
    z.disabled = false;
    z.style.backgroundColor = "orange";
    z.style.borderColor = "orange";
  } else if (noOfCheckCounts == 0) {
    let z = document.getElementById("button");
    z.disabled = true;
    z.style.backgroundColor = "grey";
    z.style.borderColor = "grey";
  }

  alert("Student deleted successfully");

}
function changeRowStyle(val) {
  let r = val.parentNode.parentNode;
  var valueEdit = r.lastChild.previousSibling.lastChild;
  var valueDel = r.lastChild.previousSibling.previousSibling.previousSibling.lastChild;

  if (val.checked) {
    r.style.backgroundColor = 'yellow';
    let x = document.getElementsByClassName("hide_button");
    for (let i = 0; i < x.length; i++) {
      x[i].style.display = "table-cell";
    }
    valueEdit.style.display = "block";
    valueDel.style.display = "block";
    noOfCheckCounts++;
  }
  else {
    r.style.backgroundColor = 'transparent';
    let x = document.getElementsByClassName("hide_button");
    valueEdit.style.display = "none";
    valueDel.style.display = "none";
    noOfCheckCounts--;
    console.log(noOfCheckCounts);
    if (noOfCheckCounts == 0) {
      for (let i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
    }
  }
  if (noOfCheckCounts > 0) {
    let z = document.getElementById("button");
    z.disabled = false;
    z.style.backgroundColor = "orange";
    z.style.borderColor = "orange";
  } else if (noOfCheckCounts == 0) {
    let z = document.getElementById("button");
    z.disabled = true;
    z.style.backgroundColor = "grey";
    z.style.borderColor = "grey";
  }
}
function changeRowStyleDynamic(val) {
  let r = val.parentNode.parentNode;
  var valueEdit = r.lastChild.lastChild;
  var valueDel = r.lastChild.previousSibling.lastChild;

  if (val.checked) {
    r.style.backgroundColor = 'yellow';
    let x = document.getElementsByClassName("hide_button");
    for (let i = 0; i < x.length; i++) {
      x[i].style.display = "table-cell";
    }
    valueEdit.style.display = "block";
    valueDel.style.display = "block";
    noOfCheckCounts++;
  }
  else {
    r.style.backgroundColor = 'transparent';
    let x = document.getElementsByClassName("hide_button");
    valueEdit.style.display = "none";
    valueDel.style.display = "none";
    noOfCheckCounts--;
    console.log(noOfCheckCounts);
    if (noOfCheckCounts == 0) {
      for (let i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
    }

  }
  if (noOfCheckCounts > 0) {
    let z = document.getElementById("button");
    z.disabled = false;
    z.style.backgroundColor = "orange";
    z.style.borderColor = "orange";
  } else if (noOfCheckCounts == 0) {
    let z = document.getElementById("button");
    z.disabled = true;
    z.style.backgroundColor = "grey";
    z.style.borderColor = "grey";
  }
}
function editStudent(val) {

  let foo = prompt('Enter Your Details Here To Edit');

}