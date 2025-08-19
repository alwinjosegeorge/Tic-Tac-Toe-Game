const cells = document.querySelectorAll('[data-cell]');
const statusDiv = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const modeSelect = document.getElementById('mode');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let mode = 'PvP';

const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

modeSelect.addEventListener('change', e => {
  mode = e.target.value;
  resetGame();
});

function checkWin(player) {
  return winningCombinations.some(comb => comb.every(i => board[i] === player));
}

function checkDraw() {
  return board.every(cell => cell !== '');
}

function updateStatus(msg) {
  statusDiv.textContent = msg;
}

function endGame(winner) {
  gameActive = false;
  cells.forEach(cell => cell.disabled = true);
  if (winner) {
    updateStatus(`Player ${winner} Wins!`);
    winningCombinations.forEach(comb => {
      if (comb.every(i => board[i] === winner)) {
        comb.forEach(i => cells[i].classList.add('winner'));
      }
    });
  } el

