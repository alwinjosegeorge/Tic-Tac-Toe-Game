const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

let board = Array(9).fill(null);
const player = 'X';  // User always X
const bot = 'O';
let gameActive = true;

// Winning combos indices
const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diagonals
];

// Check for winner or tie
function checkWin(board, currentPlayer) {
  for (let combo of winningCombos) {
    if (
      board[combo[0]] === currentPlayer &&
      board[combo[1]] === currentPlayer &&
      board[combo[2]] === currentPlayer
    ) {
      return combo;
    }
  }
  return null;
}

function isTie(board) {
  return board.every(cell => cell !== null);
}

// Highlight winning cells
function highlightWinner(combo) {
  combo.forEach(i => {
    cells[i].classList.add('winner');
    cells[i].disabled = true;
  });
}

// Bot makes a random move
function botMove() {
  if (!gameActive) return;

  // Find empty cells
  const emptyIndices = board
    .map((val, idx) => val === null ? idx : null)
    .filter(val => val !== null);

  if (emptyIndices.length === 0) return;

  // Simple AI: random choice
  const choice = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

  board[choice] = bot;
  cells[choice].textContent = bot;
  cells[choice].disabled = true;

  // Check win
  const botWinCombo = checkWin(board, bot);
  if (botWinCombo) {
    highlightWinner(botWinCombo);
    status.textContent = "Bot wins! 😞";
    gameActive = false;
    return;
  }

  if (isTie(board)) {
    status.textContent = "It's a tie! 🤝";
    gameActive = false;
    return;
  }

  // Player turn now
  status.textContent = "Your turn (X)";
  gameActive = true;
}

// Handle user click
function onCellClick(e) {
  if (!gameActive) return;

  const index = e.target.dataset.index;
  if (board[index] !== null) return;

  // Player move
  board[index] = player;
  e.target.textContent = player;
  e.target.disabled = true;

  // Check win
  const playerWinCombo = checkWin(board, player);
  if (playerWinCombo) {
    highlightWinner(playerWinCombo);
    status.textContent = "You win! 🎉";
    gameActive = false;
    return;
  }

  if (isTie(board)) {
    status.textContent = "It's a tie! 🤝";
    gameActive = false;
    return;
  }

  // Bot turn
  status.textContent = "Bot is thinking...";
  gameActive = false; // prevent player from clicking while bot is thinking

  setTimeout(() => {
    botMove();
  }, 700); // delay for bot move to simulate thinking
}

// Reset game
function resetGame() {
  board = Array(9).fill(null);
  gameActive = true;
  status.textContent = "Your turn (X)";
  cells.forEach(cell => {
    cell.textContent = '';
    cell.disabled = false;
    cell.classList.remove('winner');
  });
}

cells.forEach(cell => cell.addEventListener('click', onCellClick));
resetBtn.addEventListener('click', resetGame);
