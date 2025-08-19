const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');

let board = Array(9).fill(null);
let currentPlayer = '🐱';
let gameOver = false;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const idx = cell.dataset.index;
    if (board[idx] || gameOver) return;

    board[idx] = currentPlayer;
    cell.textContent = currentPlayer;

    const winningCombo = checkWin();
    if (winningCombo) {
      status.textContent = `${currentPlayer} wins! 🎉`;
      gameOver = true;
      highlightWinner(winningCombo);
      return;
    }

    if (board.every(cell => cell !== null)) {
      status.textContent = "It's a draw! 🤝";
      gameOver = true;
      return;
    }

    currentPlayer = currentPlayer === '🐱' ? '🐶' : '🐱';
    status.textContent = `${currentPlayer}'s turn`;
  });
});

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
  pattern.forEach(i => cells[i].classList.add('winner'));
}

function resetGame() {
  board.fill(null);
  gameOver = false;
  currentPlayer = '🐱';
  status.textContent = "🐱's turn";
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('winner');
  });
}
