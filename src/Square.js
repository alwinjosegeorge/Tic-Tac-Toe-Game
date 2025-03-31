import React, { useEffect, useState } from 'react';

function Square({ value, onClick, isWinner }) {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    if (value) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 300);
      return () => clearTimeout(timer);
    }
  }, [value]);

  return (
    <button 
      className={`square ${animate ? 'square-animation' : ''} ${isWinner ? 'winner-square' : ''}`} 
      onClick={onClick}
      value={value}
    >
      {value}
    </button>
  );
}

export default Square;
