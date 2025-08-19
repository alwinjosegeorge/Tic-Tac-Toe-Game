const cells = document.querySelectorAll('[data-cell]');
const statusDiv = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const modeSelect = document.getElementById('mode');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let mode = 'PvP';

const winningCombinations = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

modeSelect.addEventListener('change', e => {
  mode = e.target.value;
  resetGame();
});

function checkWin(player) {
  return winningCombinations.some(combination => {
    return combination.every(index => board[index] === player);
  });
}

function checkDraw() {
  return board.every(cell => cell !== '');
}

function updateStatus(message) {
  statusDiv.textContent = message;
}

function endGame(win) {
  gameActive = false;
  cells.forEach(cell => cell.disabled = true);
  if (win) {
    updateStatus(`Player ${win} Wins!`);
    winningCombinations.forEach(comb => {
      if (comb.every(index => board[index] === win)) {
        comb.forEach(index => {
          cells[index].classList.add('winner');
        });
      }
    });
  } else {
    updateStatus("It's a Draw!");
  }
}

function botMove() {
  if (!gameActive) return;

  const emptyIndexes = board.map((v,i) => v === '' ? i : null).filter(i => i !== null);

  if (emptyIndexes.length === 0) return;

  const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];

  board[randomIndex] = 'O';
  const cell = cells[randomIndex];
  cell.textContent = 'O';
  cell.setAttribute('data-mark', 'O');
  cell.disabled = true;
  
  if (checkWin('O')) {
    endGame('O');
    return;
  } else if (checkDraw()) {
    endGame(null);
    return;
  }
  currentPlayer = 'X';
  updateStatus(`Player ${currentPlayer}'s turn`);
}

function handleClick(e) {
  const cell = e.target;
  const index = [...cells].indexOf(cell);

  if (board[index] !== '' || !gameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.setAttribute('data-mark', currentPlayer);
  cell.disabled = true;

  if (checkWin(currentPlayer)) {
    endGame(currentPlayer);
    return;
  } else if (checkDraw()) {
    endGame(null);
    return;
  }

  if (mode === 'PvBot') {
    if (currentPlayer === 'X') {
      currentPlayer = 'O';
      updateStatus(`Bot's turn...`);
      cells.forEach(c => c.disabled = true);
      setTimeout(() => {
        botMove();
        if (gameActive) {
          cells.forEach((c,i) => {
            if (board[i] === '') c.disabled = false;
          });
        }
      }, 600);
    }
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus(`Player ${currentPlayer}'s turn`);
  }
}

function resetGame() {
  board.fill('');
  gameActive = true;
  currentPlayer = 'X';
  updateStatus(`Player ${currentPlayer}'s turn`);
  cells.forEach(cell => {
    cell.textContent = '';
    cell.disabled = false;
    cell.classList.remove('winner');
    cell.removeAttribute('data-mark');
  });
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetBtn.addEventListener('click', resetGame);

updateStatus(`Player ${currentPlayer}'s turn`);
