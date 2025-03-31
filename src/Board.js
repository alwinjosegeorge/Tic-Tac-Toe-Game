
import React from 'react';
import Square from './Square';

function Board({ squares, onClick, winningLine }) {
  const renderSquare = (i) => {
    const isWinner = winningLine ? winningLine.includes(i) : false;
    
    return (
      <Square 
        key={i} 
        value={squares[i]} 
        onClick={() => onClick(i)}
        isWinner={isWinner}
      />
    );
  };

  return (
    <div className="board">
      {Array(9).fill(null).map((_, i) => renderSquare(i))}
    </div>
  );
}

export default Board;
