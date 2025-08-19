const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');

let currentPlayer = '🐱';
let board = Array(9).fill(null);
let gameOver = false;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const index = cell.dataset.index;

    if (board[index] || gameOver) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
      status.textContent = `${currentPlayer} wins! 🎉`;
      gameOver = true;
      highlightWin(checkWin());
    } else if (board.every(cell => cell)) {
      status.textContent = "It's a draw! 😐";
      gameOver = true;
    } else {
      currentPlayer = currentPlayer === '🐱' ? '🐶' : '🐱';
      status.textContent = `${currentPlayer}'s turn`;
    }
  });
});

function checkWin() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return pattern;
    }
  }
  return null;
}

function highlightWin(pattern) {
  pattern.forEach(index => {
    cells[index].classList.add('winner');
  });
}

function resetGame() {
  board = Array(9).fill(null);
  gameOver = false;
  currentPlayer = '🐱';
  status.textContent = "🐱's turn";
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('winner');
  });
}
