import React, { useState } from 'react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [playerNames, setPlayerNames] = useState({ player1: '', player2: '' });
  
  const handleSquareClick = (index) => {
    if (board[index] || calculateWinner(board)) {
      return;
    }
    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const calculateWinner = (board) => {
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
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-6">
      <h2 className="text-2xl font-semibold mb-4">Tic Tac Toe Game</h2>
      <div className="grid grid-cols-3 gap-1" style={{ borderRadius: '25px' }}>
        {board.map((square, index) => (
          <div
            key={index}
            className="w-24 h-24 bg-white flex items-center justify-center text-3xl font-bold cursor-pointer border-2 border-gray-300"
            style={{ borderTopLeftRadius: index === 0 ? '25px' : '0', borderBottomRightRadius: index === 8 ? '25px' : '0'}}
            onClick={() => handleSquareClick(index)}
          >
            {square}
          </div>
        ))}
      </div>
      <div className="mt-4">
        {winner ? <p className="text-xl">Winner: {winner}</p> : <p className="text-xl">Next player: {isXNext ? 'X' : 'O'}</p>}
      </div>
      <form className="w-full max-w-sm mt-8">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/2">
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder="Player 1 Name" onChange={(e) => setPlayerNames({ ...playerNames, player1: e.target.value })}/>
          </div>
          <div className="md:w-1/2">
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder="Player 2 Name" onChange={(e) => setPlayerNames({ ...playerNames, player2: e.target.value })}/>
          </div>
        </div>
        <p className="text-lg">Player 1: {playerNames.player1}</p>
        <p className="text-lg">Player 2: {playerNames.player2}</p>
      </form>
    </div>
  );
};

export default TicTacToe;