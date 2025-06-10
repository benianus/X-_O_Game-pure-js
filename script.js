// GLOBAL VARIABLS
let currentPlayer = "X";
let isGameFinished = false;
let maxGame = 0;
let gameAnswers = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
];
let xWinCount = 0;
let oWinCount = 0;
let drawCount = 0;
let isComputerPlayerEnabled = false;

// LOGIC
function play(row, id) {
  //    THIS LINES IS FOR DEBUGGING
  //    console.log("current player: ", currentPlayer);
  //    console.log("max game: ", maxGame);
  //    console.log("game answers: ", gameAnswers);

  //    exit if the game finished
  if (isGameFinished) {
    return;
  }
  //   Verify if the cell is already filled
  if (gameAnswers[row][id] == "X" || gameAnswers[row][id] == "O") {
    return;
  }
  //   Increase max game played to check draw or if there possible to play again
  maxGame++;
  //   change the code part data
  gameAnswers[row][id] = currentPlayer;
  //   change the front end part data
  document.getElementById(`square-${row}-${id}`).innerHTML = currentPlayer;
  //   check if some one win even if the game didn't end
  checkTheFinalResult();
  changeCurrentPlayer();
  //   if the player is 'O' execute computer play
  if (isComputerPlayerEnabled) {
    if (maxGame == 9) {
        return;
    }
    playWithComputer();
  }
}

function changeCurrentPlayer() {
  if (currentPlayer == "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  document.getElementById("header").innerHTML = `${currentPlayer} Turn`;
}

function playWithComputer() {
  let row = Math.floor(Math.random() * 3);
  let id = Math.floor(Math.random() * 3);

  //   if the this cell already filled try another cell
  while (gameAnswers[row][id] == "X" || gameAnswers[row][id] == "O") {
    row = Math.floor(Math.random() * 3);
    id = Math.floor(Math.random() * 3);
  }
  //    exit if the game finished
  if (isGameFinished) {
    return;
  }
  //   Verify if the cell is already filled
  if (gameAnswers[row][id] == "X" || gameAnswers[row][id] == "O") {
    return;
  }
  //   Increase max game played to check draw or if there possible to play again
  maxGame++;
  //   change the code part data
  gameAnswers[row][id] = currentPlayer;
  //   change the front end part data
  document.getElementById(`square-${row}-${id}`).innerHTML = currentPlayer;
  //   check if some one win even if the game didn't end
  checkTheFinalResult();
  changeCurrentPlayer();
}

function checkTheFinalResult() {
  if (
    (gameAnswers[0][0] === gameAnswers[0][1] &&
      gameAnswers[0][1] === gameAnswers[0][2]) ||
    (gameAnswers[1][0] === gameAnswers[1][1] &&
      gameAnswers[1][1] === gameAnswers[1][2]) ||
    (gameAnswers[2][0] === gameAnswers[2][1] &&
      gameAnswers[2][1] === gameAnswers[2][2]) ||
    (gameAnswers[0][0] === gameAnswers[1][0] &&
      gameAnswers[1][0] === gameAnswers[2][0]) ||
    (gameAnswers[0][1] === gameAnswers[1][1] &&
      gameAnswers[1][1] === gameAnswers[2][1]) ||
    (gameAnswers[0][2] === gameAnswers[1][2] &&
      gameAnswers[1][2] === gameAnswers[2][2]) ||
    (gameAnswers[0][0] === gameAnswers[1][1] &&
      gameAnswers[1][1] === gameAnswers[2][2]) ||
    (gameAnswers[0][2] === gameAnswers[1][1] &&
      gameAnswers[1][1] === gameAnswers[2][0])
  ) {
    let winner = currentPlayer == "O" ? "O" : "X";
    saveWinResults(winner);
    isGameFinished = true;
  } else {
    if (maxGame == 9) {
      alertify.alert("Draw");
      isGameFinished = true;
      drawCount++;
      saveResultInLocalStorage();
    }
  }
}

function saveWinResults(winner) {
  if (winner == "X") {
    xWinCount++;
  } else {
    oWinCount++;
  }

  saveResultInLocalStorage();

  let message = `Results: X wins: ${xWinCount} | O wins: ${oWinCount} | Draw: ${drawCount}`;
  alertify.alert(`${winner} Won`, message);
}

function saveResultInLocalStorage() {
  localStorage.setItem("xWinCount", xWinCount);
  localStorage.setItem("oWinCount", oWinCount);
  localStorage.setItem("drawCount", drawCount);
}

function getResultsFromLocalStorage() {
  xWinCount = localStorage.getItem("xWinCount");
  oWinCount = localStorage.getItem("oWinCount");
  drawCount = localStorage.getItem("drawCount");
}

function showResults() {
  getResultsFromLocalStorage();
  let message = `X wins: ${xWinCount} | O wins: ${oWinCount} | Draw: ${drawCount}`;
  alertify.alert(`Results`, message);
}

function enableComputerPlayer() {
  let computerPlayerElement = document.getElementById("computer-player");

  if (isComputerPlayerEnabled) {
    computerPlayerElement.style.backgroundColor = "darkgray";
    computerPlayerElement.innerHTML = "Enable Computer Player";
    isComputerPlayerEnabled = false;
  } else {
    computerPlayerElement.style.backgroundColor = "green";
    computerPlayerElement.innerHTML = "Disable Computer Player";
    isComputerPlayerEnabled = true;
  }

  console.log(isComputerPlayerEnabled)
}
function reset() {
  currentPlayer = "X";
  gameAnswers = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
  ];

  isGameFinished = false;
  maxGame = 0;

  document.getElementById(`square-0-0`).innerHTML = "";
  document.getElementById(`square-0-1`).innerHTML = "";
  document.getElementById(`square-0-2`).innerHTML = "";
  document.getElementById(`square-1-0`).innerHTML = "";
  document.getElementById(`square-1-1`).innerHTML = "";
  document.getElementById(`square-1-2`).innerHTML = "";
  document.getElementById(`square-2-0`).innerHTML = "";
  document.getElementById(`square-2-1`).innerHTML = "";
  document.getElementById(`square-2-2`).innerHTML = "";

  document.getElementById("header").innerHTML = `${currentPlayer} Turn`;

  //    THIS LINES IS FOR DEBUGGING
  //    console.log("current player: ", currentPlayer);
  //    console.log("max game: ", maxGame);
  //    console.log("game answers: ", gameAnswers);
}
