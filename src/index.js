import "./styles.css";

document.getElementById("panel").innerHTML = `
<h2>Tic Tac Toe</h2>
<div>_______________</div>
<div>Player 1: X</div>
<div>Player 2: O</div>
<div_______________div>`;

var body = document.body,
  table = document.createElement("table");
table.style.border = "5px solid black";

var clock = document.getElementById("clockdiv");
var elem = document.getElementById("InnerProgressBar");

var counter = 0;
var timeCounter = 0;
var time;
var timeinterval;
var width = 0;
var id;

createtable();

function createtable() {
  for (var i = 0; i < 5; i++) {
    var Row = table.insertRow();
    for (var j = 0; j < 5; j++) {
      if (i === 1 && j === 5) {
        break;
      } else {
        var tableCell = Row.insertCell();
        var cellText = document.createTextNode("");
        tableCell.appendChild(cellText);
        if (i === 1 && j === 1) {
          tableCell.setAttribute("rowSpan", "1");
        }
      }
    }
  }
}

body.appendChild(table);

onclick(table);

function onclick(table) {
  for (var i = 0; i < table.rows.length; i++) {
    for (var j = 0; j < table.rows[i].cells.length; j++) {
      table.rows[i].cells[j].onclick = function () {
        tableText(this);
      };
    }
  }
}

function tableText(tableCell) {
  if (counter % 2 === 0) {
    if (tableCell.innerHTML === "") {
      tableCell.innerHTML = "X";
      tableCell.style.backgroundColor = "rgb(124, 252, 0)";
      whoWon(table, tableCell);
      checkDraw(table);
      ClearTime(this);
      changeTurn(this);
      counter++;
    } else {
      alert("Pick other cell!");
    }
  } else {
    if (tableCell.innerHTML === "") {
      tableCell.innerHTML = "O";
      tableCell.style.backgroundColor = "rgb(250, 128, 114)";
      whoWon(table, tableCell);
      checkDraw(table);
      ClearTime(this);
      changeTurn(this);
      counter++;
    } else {
      alert("Pick other cell!");
    }
  }
}

function whoWon(table) {
  var XY = ["X", "O"];

  for (var i = 0; i < 2; i++) {
    var horizontal1 = 0;
    var horizontal2 = 0;
    var horizontal3 = 0;
    var horizontal4 = 0;
    var horizontal5 = 0;
    var vertical1 = 0;
    var vertical2 = 0;
    var vertical3 = 0;
    var vertical4 = 0;
    var vertical5 = 0;
    var oblique1 = 0;
    var oblique2 = 0;

    for (var j = 0; j < 5; j++) {
      if (table.rows[0].cells[j].innerHTML === XY[i]) {
        horizontal1++;
      }
      if (table.rows[1].cells[j].innerHTML === XY[i]) {
        horizontal2++;
      }
      if (table.rows[2].cells[j].innerHTML === XY[i]) {
        horizontal3++;
      }
      if (table.rows[3].cells[j].innerHTML === XY[i]) {
        horizontal4++;
      }
      if (table.rows[4].cells[j].innerHTML === XY[i]) {
        horizontal5++;
      }
      if (table.rows[j].cells[0].innerHTML === XY[i]) {
        vertical1++;
      }
      if (table.rows[j].cells[1].innerHTML === XY[i]) {
        vertical2++;
      }
      if (table.rows[j].cells[2].innerHTML === XY[i]) {
        vertical3++;
      }
      if (table.rows[j].cells[3].innerHTML === XY[i]) {
        vertical4++;
      }
      if (table.rows[j].cells[4].innerHTML === XY[i]) {
        vertical5++;
      }
      if (table.rows[j].cells[j].innerHTML === XY[i]) {
        oblique1++;
      }
      var reduce = 4 - j;
      if (table.rows[j].cells[reduce].innerHTML === XY[i]) {
        oblique2++;
      }
    }

    if (
      horizontal1 === 5 ||
      horizontal2 === 5 ||
      horizontal3 === 5 ||
      horizontal4 === 5 ||
      horizontal5 === 5 ||
      vertical1 === 5 ||
      vertical2 === 5 ||
      vertical3 === 5 ||
      vertical4 === 5 ||
      vertical5 === 5 ||
      oblique1 === 5 ||
      oblique2 === 5
    ) {
      if (XY[i] === "X") {
        alert("Player 1 won!");
        clearTable(table);
        counter = 1;
        ClearTime();
        clearWidth();
        clearTable(table);
        break;
      }
      if (XY[i] === "O") {
        alert("Player 2 won!");
        clearTable(table);
        counter = 1;
        ClearTime();
        clearWidth();
        clearTable(table);
        break;
      }
    }
  }
}

function checkDraw(table) {
  var count = 0;
  for (var i = 0; i < table.rows.length; i++) {
    for (var j = 0; j < table.rows[i].cells.length; j++) {
      if (
        table.rows[i].cells[j].innerHTML === "X" ||
        table.rows[i].cells[j].innerHTML === "O"
      ) {
        count++;
      }
    }
  }
  if (count === 25) {
    alert("It's draw!");
    clearTable(table);
    ClearTime();

    counter = 0;
  }
}

function clearTable(table) {
  for (var i = 0; i < table.rows.length; i++) {
    for (var j = 0; j < table.rows[i].cells.length; j++) {
      table.rows[i].cells[j].innerHTML = "";
    }
  }
}

function updateClock() {
  clock.innerHTML = 10 - timeCounter;
  timeCounter++;
}

function changeTurn() {
  clearInterval(id);
  clearWidth();
  id = setInterval(frame, 100);
  function frame() {
    if (width >= 100) {
      clearWidth();
      clearInterval(id);
    } else {
      width++;
      elem.style.width = width + "%";
      elem.innerHTML = width + "%";
    }
  }

  timeCounter = 0;
  clearInterval(timeinterval);
  timeinterval = setInterval(updateClock, 1000);
  time = setTimeout(alertTime, 10000);
  updateClock();
}

function alertTime() {
  counter++;
  alert("Timeout!");
  changeTurn();
}

function ClearTime() {
  clearTimeout(time);
}

function clearWidth() {
  width = 0;
  elem.style.width = width + "%";
  elem.innerHTML = width + "%";
}
