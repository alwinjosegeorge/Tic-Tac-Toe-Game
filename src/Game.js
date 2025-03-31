import React, { useState } from 'react';
import Board from './Board';

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winningLine, setWinningLine] = useState(null);

  const handleClick = (i) => {
    // If square is already filled or game is won, do nothing
    if (winningLine || squares[i]) {
      return;
    }
    
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
    
    // Check for winner
    const winner = calculateWinner(newSquares);
    if (winner) {
      setWinningLine(winner.line);
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinningLine(null);
  };

  const result = calculateWinner(squares);
  const winner = result ? result.winner : null;
  let status;
  
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (squares.every(square => square !== null)) {
    status = 'Game ended in a draw!';
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <div className="status">{status}</div>
      <Board 
        squares={squares} 
        onClick={handleClick}
        winningLine={winningLine}
      />
      <button className="restart" onClick={resetGame}>
        Restart Game
      </button>
    </div>
  );
}

// Helper function to calculate winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line: lines[i]
      };
    }
  }
  
  return null;
}

export default Game;
