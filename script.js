let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const statusMessage = document.getElementById('status-message');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-btn');

// Initialize the game
function initGame() {
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
        cell.textContent = '';
        cell.removeAttribute('data-player');
        cell.classList.remove('pop');
    });
    
    resetButton.addEventListener('click', resetGame);
    
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    updateStatusMessage();
}

function handleCellClick(e) {
    const cellIndex = parseInt(e.target.getAttribute('data-index'));
    
    if (gameBoard[cellIndex] !== '' || !gameActive) {
        return;
    }
    
    updateCell(e.target, cellIndex);
    checkGameResult();
}

function updateCell(cell, index) {
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.setAttribute('data-player', currentPlayer);
    
    // Add animation
    cell.classList.add('pop');
    setTimeout(() => {
        cell.classList.remove('pop');
    }, 300);
}

function checkGameResult() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    
    let roundWon = false;
    
    for (let i = 0; i < winPatterns.length; i++) {
        const [a, b, c] = winPatterns[i];
        
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            roundWon = true;
            break;
        }
    }
    
    if (roundWon) {
        statusMessage.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }
    
    if (!gameBoard.includes('')) {
        statusMessage.textContent = 'Game ended in a draw!';
        gameActive = false;
        return;
    }
    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatusMessage();
}

function updateStatusMessage() {
    statusMessage.textContent = `Player ${currentPlayer}'s turn`;
}

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.removeAttribute('data-player');
    });
    
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    updateStatusMessage();
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', initGame);
