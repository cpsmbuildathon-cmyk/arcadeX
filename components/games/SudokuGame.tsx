import React, { useState } from 'react';

// A simple hardcoded easy board for demo purposes. 
// In a real app, use a Sudoku generator library.
const INITIAL_BOARD = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

const SOLUTION = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
];

const SudokuGame: React.FC = () => {
  const [board, setBoard] = useState<number[][]>(INITIAL_BOARD.map(row => [...row]));
  const [status, setStatus] = useState<'playing' | 'won' | 'lost'>('playing');

  const handleChange = (row: number, col: number, value: string) => {
    const val = parseInt(value) || 0;
    if (val < 0 || val > 9) return;
    
    // Check if it's an initial pre-filled cell
    if (INITIAL_BOARD[row][col] !== 0) return;

    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = val;
    setBoard(newBoard);
  };

  const checkSolution = () => {
    let correct = true;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] !== SOLUTION[i][j]) {
          correct = false;
          break;
        }
      }
    }
    setStatus(correct ? 'won' : 'lost');
  };

  const reset = () => {
    setBoard(INITIAL_BOARD.map(row => [...row]));
    setStatus('playing');
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-900 min-h-full">
      <h2 className="text-2xl text-purple-400 mb-4 arcade-font">Brain Logic Sudoku</h2>
      
      <div className="grid grid-cols-9 gap-0.5 bg-gray-600 border-4 border-gray-700 p-1 mb-6">
        {board.map((row, rIndex) => (
          row.map((cell, cIndex) => {
            const isInitial = INITIAL_BOARD[rIndex][cIndex] !== 0;
            const borderRight = (cIndex + 1) % 3 === 0 && cIndex !== 8 ? 'border-r-2 border-r-gray-800' : '';
            const borderBottom = (rIndex + 1) % 3 === 0 && rIndex !== 8 ? 'border-b-2 border-b-gray-800' : '';
            
            return (
              <input
                key={`${rIndex}-${cIndex}`}
                type="text"
                maxLength={1}
                value={cell === 0 ? '' : cell}
                disabled={isInitial}
                onChange={(e) => handleChange(rIndex, cIndex, e.target.value)}
                className={`w-8 h-8 md:w-10 md:h-10 text-center text-lg font-bold 
                  ${isInitial ? 'bg-gray-300 text-gray-900' : 'bg-white text-blue-600'} 
                  ${borderRight} ${borderBottom} focus:outline-none focus:bg-blue-100`}
              />
            );
          })
        ))}
      </div>

      <div className="flex gap-4">
        <button 
          onClick={checkSolution}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded font-bold transition-colors"
        >
          Check
        </button>
        <button 
          onClick={reset}
          className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded font-bold transition-colors"
        >
          Reset
        </button>
      </div>

      {status === 'won' && <p className="mt-4 text-green-400 text-xl font-bold animate-bounce">Perfect! You Solved It!</p>}
      {status === 'lost' && <p className="mt-4 text-red-400 text-xl font-bold">Incorrect. Keep trying!</p>}
    </div>
  );
};

export default SudokuGame;
