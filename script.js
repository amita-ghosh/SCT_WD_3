// script.js
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

// Handle cell click
function handleCellClick(event) {
  const cellIndex = event.target.getAttribute('data-index');
  if (board[cellIndex] !== '' || !gameActive) return;

  board[cellIndex] = currentPlayer;
  event.target.textContent = currentPlayer;
  checkResult();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Check for winner or draw
function checkResult() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }
  
  if (roundWon) {
    alert(`Player ${currentPlayer} wins!`);
    gameActive = false;
    return;
  }

  if (!board.includes('')) {
    alert('Game is a draw!');
    gameActive = false;
  }
}

// Restart game
function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  cells.forEach(cell => cell.textContent = '');
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
