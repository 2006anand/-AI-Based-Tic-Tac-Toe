import React, { useState, useEffect } from 'react';
import { Brain, User, Trophy, RotateCcw } from 'lucide-react';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [difficulty, setDifficulty] = useState('unbeatable');
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({ player: 0, ai: 0, draws: 0 });
  const [thinking, setThinking] = useState(false);

  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  const checkWinner = (squares) => {
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: pattern };
      }
    }
    return null;
  };

  const isBoardFull = (squares) => squares.every(cell => cell !== null);

  const minimax = (squares, depth, isMaximizing, alpha = -Infinity, beta = Infinity) => {
    const result = checkWinner(squares);
    
    if (result) {
      return result.winner === 'O' ? 10 - depth : depth - 10;
    }
    
    if (isBoardFull(squares)) {
      return 0;
    }

    if (isMaximizing) {
      let maxEval = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (squares[i] === null) {
          squares[i] = 'O';
          const evaluation = minimax(squares, depth + 1, false, alpha, beta);
          squares[i] = null;
          maxEval = Math.max(maxEval, evaluation);
          alpha = Math.max(alpha, evaluation);
          if (beta <= alpha) break;
        }
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let i = 0; i < 9; i++) {
        if (squares[i] === null) {
          squares[i] = 'X';
          const evaluation = minimax(squares, depth + 1, true, alpha, beta);
          squares[i] = null;
          minEval = Math.min(minEval, evaluation);
          beta = Math.min(beta, evaluation);
          if (beta <= alpha) break;
        }
      }
      return minEval;
    }
  };

  const getBestMove = (squares) => {
    let bestScore = -Infinity;
    let bestMove = null;

    for (let i = 0; i < 9; i++) {
      if (squares[i] === null) {
        squares[i] = 'O';
        const score = minimax(squares, 0, false);
        squares[i] = null;
        
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    
    return bestMove;
  };

  const getRandomMove = (squares) => {
    const available = squares.map((cell, idx) => cell === null ? idx : null).filter(val => val !== null);
    return available[Math.floor(Math.random() * available.length)];
  };

  const getMediumMove = (squares) => {
    if (Math.random() < 0.7) {
      return getBestMove(squares);
    }
    return getRandomMove(squares);
  };

  const getAIMove = (squares) => {
    switch (difficulty) {
      case 'easy':
        return getRandomMove(squares);
      case 'medium':
        return getMediumMove(squares);
      case 'unbeatable':
      default:
        return getBestMove(squares);
    }
  };

  const handleClick = (index) => {
    if (board[index] || gameOver || !isXNext || thinking) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsXNext(false);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result);
      setGameOver(true);
      setScores(prev => ({ ...prev, player: prev.player + 1 }));
      return;
    }

    if (isBoardFull(newBoard)) {
      setGameOver(true);
      setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
      return;
    }
  };

  useEffect(() => {
    if (!isXNext && !gameOver) {
      setThinking(true);
      setTimeout(() => {
        const aiMove = getAIMove([...board]);
        const newBoard = [...board];
        newBoard[aiMove] = 'O';
        setBoard(newBoard);
        setIsXNext(true);
        setThinking(false);

        const result = checkWinner(newBoard);
        if (result) {
          setWinner(result);
          setGameOver(true);
          setScores(prev => ({ ...prev, ai: prev.ai + 1 }));
          return;
        }

        if (isBoardFull(newBoard)) {
          setGameOver(true);
          setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
        }
      }, 500);
    }
  }, [isXNext, gameOver, board]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
    setWinner(null);
    setThinking(false);
  };

  const resetScores = () => {
    setScores({ player: 0, ai: 0, draws: 0 });
    resetGame();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
          <h1 className="text-4xl font-bold text-white text-center mb-8">
            AI Tic-Tac-Toe
          </h1>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-500/20 rounded-xl p-4 text-center border border-blue-400/30">
              <User className="w-6 h-6 mx-auto mb-2 text-blue-300" />
              <div className="text-2xl font-bold text-white">{scores.player}</div>
              <div className="text-xs text-blue-200">You (X)</div>
            </div>
            <div className="bg-purple-500/20 rounded-xl p-4 text-center border border-purple-400/30">
              <Trophy className="w-6 h-6 mx-auto mb-2 text-purple-300" />
              <div className="text-2xl font-bold text-white">{scores.draws}</div>
              <div className="text-xs text-purple-200">Draws</div>
            </div>
            <div className="bg-pink-500/20 rounded-xl p-4 text-center border border-pink-400/30">
              <Brain className="w-6 h-6 mx-auto mb-2 text-pink-300" />
              <div className="text-2xl font-bold text-white">{scores.ai}</div>
              <div className="text-xs text-pink-200">AI (O)</div>
            </div>
          </div>

          <div className="mb-6">
            <label className="text-white text-sm font-medium mb-2 block">Difficulty Level</label>
            <div className="grid grid-cols-3 gap-2">
              {['easy', 'medium', 'unbeatable'].map(level => (
                <button
                  key={level}
                  onClick={() => {
                    setDifficulty(level);
                    resetGame();
                  }}
                  className={`py-2 px-4 rounded-lg font-medium transition-all ${
                    difficulty === level
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 mb-6">
            <div className="grid grid-cols-3 gap-3">
              {board.map((cell, index) => (
                <button
                  key={index}
                  onClick={() => handleClick(index)}
                  disabled={gameOver || thinking}
                  className={`aspect-square rounded-xl text-5xl font-bold transition-all ${
                    winner?.line.includes(index)
                      ? 'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg shadow-yellow-500/50'
                      : 'bg-white/10 hover:bg-white/20'
                  } ${
                    cell === 'X' ? 'text-blue-400' : 'text-pink-400'
                  } ${
                    gameOver || thinking ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
                  } border border-white/20`}
                >
                  {cell}
                </button>
              ))}
            </div>
          </div>

          {thinking && (
            <div className="text-center text-purple-300 mb-4 animate-pulse">
              AI is thinking...
            </div>
          )}

          {gameOver && (
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-white mb-2">
                {winner ? (
                  winner.winner === 'X' ? '🎉 You Win!' : '🤖 AI Wins!'
                ) : (
                  "🤝 It's a Draw!"
                )}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={resetGame}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              New Game
            </button>
            <button
              onClick={resetScores}
              className="bg-white/10 text-white py-3 px-6 rounded-xl font-medium hover:bg-white/20 transition-all border border-white/20"
            >
              Reset Scores
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
