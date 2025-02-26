import { useState } from "react";

function Square({ value, onSquareClick, isWinningSquare }) {
  return (
    <button className={`square ${isWinningSquare ? "winning-square" : ""}`} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, history }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)[0]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    // Use squareCoords to get the position of the square
    onPlay(nextSquares, i); // Pass the position to handlePlay
  }

  const [winningPlayer, winningLine] = calculateWinner(squares);
  let status;
  if (winningPlayer) {
    status = "Winner: " + winningPlayer;
  } else if (history.length === 10) {
    status = "Draw!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      {Array(3).fill(null).map((_, row) => (
        <div className="board-row" key={row}>
          {Array(3).fill(null).map((_, col) => {
            const index = row * 3 + col;
            const isWinningSquare = winningLine?.includes(index); // Check if square is in winning line
            return (
              <Square
                key={index}
                value={squares[index]}
                onSquareClick={() => handleClick(index)}
                isWinningSquare={isWinningSquare}
              />
            );
          })}
        </div>
      ))}
    </>
  );
}


export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true); // New state for sorting order
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [lastPosition, setLastPosition] = useState([null, null]); // Track last position of the move


  function handlePlay(nextSquares, index) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setLastPosition(squareCoords(index)); // Calculate and store the position of the last move
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    const index = history[nextMove].findIndex((square) => square === "X" || square === "O");
    setLastPosition(squareCoords(index)); // Update last position based on the jumped move

  }

  function toggleOrder() {
    setIsAscending(!isAscending);
  }

  let moves = history.map((squares, move) => {
    let description;
    if (move === history.length - 1) {
      description = "You are at move #" + move;
    } else if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }

    // Only show position for moves after the first
    const positionInfo = move > 0 ? ` (Row: ${squareCoords(move)[0]}, Col: ${squareCoords(move)[1]})` : '';
    const player = move % 2 === 0 ? "X" : "O"; // Determine the player

    return (
      <li key={move}>
        {move === 0 && move != history.length - 1 ? (
          <button onClick={() => jumpTo(move)}>{description}</button>
        ) : move === 0 && move === history.length - 1 ? (
          description
        ) 
        : move === history.length - 1 && move != 0 ? (
        <>
          {description} ({player}: Row {lastPosition[0] + 1}, Col {lastPosition[1] + 1})
        </>
        ) : (
        <>
          <button onClick={() => jumpTo(move)}>{description}</button> ({player}: Row {lastPosition[0] + 1}, Col {lastPosition[1] + 1})
        </>
        )
        }
      </li>
    );
  });

  if (!isAscending) {
    moves.reverse();
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} history={history} />
      </div>
      <div className="game-info">
        <button onClick={toggleOrder}>
          {isAscending ? "Show Descending" : "Show Ascending"}
        </button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
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
      return [squares[a], lines[i]];
    }
  }
  return [null, null];
}

function squareCoords(i) {
  const row = Math.trunc(i / 3);
  const col = i % 3;
  return [row, col];
}
