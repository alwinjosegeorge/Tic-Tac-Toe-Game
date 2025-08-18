const board = document.querySelector("#board");
const cells = document.querySelectorAll("[data-cell]");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

let currentPlayer = "X";
let running = true;

// Winning patterns (indexes of cells)
const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8], // Rows
  [0,3,6], [1,4,7], [2,5,8], // Cols
  [0,4,8], [2,4,6]           // Diagonals
];

cells.forEach(cell => cell.addEventListener("click", cellClicked));
resetBtn.addEventListener("click", restartGame);

function cellClicked() {
  const index = [...cells].indexOf(this);

  if (this.textContent !== "" || !running) return;

  this.textContent = currentPlayer;
  checkWinner();
}

function changePlayer() {
  currentPlayer = (currentPlayer === "X") ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
  let roundWon = false;

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      roundWon = true;
      highlightWinner(pattern);
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
    running = false;
  } else if ([...cells].every(cell => cell.textContent !== "")) {
    statusText.textContent = "😅 It's a Draw!";
    running = false;
  } else {
    changePlayer();
  }
}

function highlightWinner(pattern) {
  pattern.forEach(i => cells[i].classList.add("winner"));
}

function restartGame() {
  currentPlayer = "X";
  running = true;
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("winner");
  });
}
