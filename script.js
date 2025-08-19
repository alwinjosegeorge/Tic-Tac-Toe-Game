const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameOver = false;

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function updateStatus(message) {
  status.textContent = message;
}

function disableAllCells() {
  cells.forEach(cell => cell.disabled = true);
}

function enableEmptyCells() {
  cells.forEach((cell, i) => {
    cell.disabled = board[i] !== null;
  });
}

function checkWin() {
  for (const pattern of winPatterns) {
    const [a,b,c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return pattern;
    }
  }
  return null;
}

function highlightWinner(pattern) {
  pattern.forEach(i => {
    cells[i].classList.add('winner');
    cells[i].disabled = true;
  });
}

function makeMove(i) {
  if (board[i] || gameOver) return;

  board[i] = currentPlayer;
  cells[i].textContent = currentPlayer;
  cells[i].disabled = true;

  const winningCombo = checkWin();

  if (winningCombo) {
    updateStatus(`Player ${currentPlayer} wins! 🎉`);
    highlightWinner(winningCombo);
    gameOver = true;
    disableAllCells();
    return;
  }

  if (board.every(cell => cell !== null)) {
    updateStatus("It's a draw! 🤝");
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus(`🕹️ Player ${currentPlayer}'s turn`);
}

cells.forEach((cell, i) => {
  cell.addEventListener('click', () => makeMove(i));
});

resetBtn.addEventListener('click', () => {
  board.fill(null);
  cells.forEach(cell => {
    cell.textContent = '';
    cell.disabled = false;
    cell.classList.remove('winner');
  });
  currentPlayer = 'X';
  gameOver = false;
  updateStatus(`🕹️ Player ${currentPlayer}'s turn`);
});

// Initialize status
updateStatus(`🕹️ Player ${currentPlayer}'s turn`);
