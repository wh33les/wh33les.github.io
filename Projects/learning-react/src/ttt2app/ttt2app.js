import { useEffect, useMemo, useState } from "react";
import "./app2styles.css";

const xSound = new Audio(process.env.PUBLIC_URL + "/sounds/x.mp3");
const oSound = new Audio(process.env.PUBLIC_URL + "/sounds/o.mp3");
const winXSound = new Audio(process.env.PUBLIC_URL + "/sounds/win-x.mp3");
const winOSound = new Audio(process.env.PUBLIC_URL + "/sounds/win-o.mp3");
const drawSound = new Audio(process.env.PUBLIC_URL + "/sounds/draw.mp3");

function Square({ value, onSquareClick, isWinningSquare }) {
  const isEmpty = value === null;  // Check if the square is empty
  return (
    <button className={`mysquare ${isWinningSquare ? "my-winning-square" : ""} ${isEmpty ? "empty" : ""}`}
      onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, history, currentMove }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)[0]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares, i); // Pass the position to handlePlay
  }

  const [winningPlayer, winningLine] = calculateWinner(squares);
  let status;
  if (winningPlayer) {
    status = "Winner: " + winningPlayer;
  } else if (currentMove === history.length - 1 && history.length === 10) {
    status = "Draw!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="my-status"><h3>{status}</h3></div>
      <div className="board-container">
        <WinningOverlay winningLine={winningLine} />
        <div className="board">
          {squares.map((square, index) => {
            const isWinningSquare = winningLine?.includes(index);
            return (
              <Square
                key={index}
                value={square}
                onSquareClick={() => handleClick(index)}
                isWinningSquare={isWinningSquare}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}


export default function Game() {
  const [selectedMove, setSelectedMove] = useState(null);

  useEffect(() => {
    // Preload audio files
    [xSound, oSound, winXSound, winOSound, drawSound].forEach((sound) => {
      sound.load();
    });
  }, []);
  const [history, setHistory] = useState([{ squares: Array(9).fill(null), position: [null, null] }]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true); // New state for sorting order
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove]?.squares || Array(9).fill(null);

  function handlePlay(nextSquares, index) {
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      { squares: nextSquares, position: squareCoords(index) }
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    if (xIsNext) {
      xSound.play(); // Play preloaded sound
    } else {
      oSound.play();
    }

    const [winningPlayer] = calculateWinner(nextSquares);

    if (winningPlayer === "X") {
      winXSound.play();
    } else if (winningPlayer === "O") {
      winOSound.play();
    } else if (nextHistory.length === 10) {
      drawSound.play();
    }
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setSelectedMove(nextMove);
  }

  function toggleOrder() {
    setIsAscending(!isAscending);
  }

  let moves = history.map((moveData, move) => {
    const { position } = moveData;
    let description;
    if (move === history.length - 1) {
      description = `You are at move #${move}.`;
    } else if (move > 0) {
      description = `Go to move #${move}.`;
    } else {
      description = "Go to game start.";
    }

    const player = move % 2 === 0 ? "O" : "X"; // Determine the player

    return (
      <li key={move}>
        {move === 0 && move !== history.length - 1 ? (
          <button className="mybutton" onClick={() => jumpTo(move)}>{description}</button>
        ) : move === history.length - 1 ? (
          description
        ) : (
          <button className="mybutton" onClick={() => jumpTo(move)}>
            {description}
          </button>
        )}
        {position[0] !== null ? ` (${player}: Row ${position[0] + 1}, Col ${position[1] + 1})` : ''}
      </li>
    );
  });

  if (!isAscending) {
    moves.reverse();
  }

  const board = useMemo(() => (
    <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} history={history} currentMove={currentMove} />
  ), [currentSquares, currentMove]); // Add currentMove as a dependency

  return (
    <div className="game">
      <div className="game-board">
        {board}
      </div>
      <div className="my-game-info">
        <button className="desc-button" onClick={toggleOrder}>
          {isAscending ? "Show Descending" : "Show Ascending"}
        </button>
        <p><h4><u>History:</u></h4></p>
        <ul>{moves}</ul>
        {selectedMove !== null && (
          <p className="move-info">
            <i><b>(restarted at move #{selectedMove})</b></i>
          </p>
        )}
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


function WinningOverlay({ winningLine }) {
  const [dashOffset, setDashOffset] = useState(null); // Start hidden

  useEffect(() => {
    if (winningLine) {
      setDashOffset(null);
      setTimeout(() => setDashOffset(0), 50); // Trigger animation
    }
  }, [winningLine]);

  if (!winningLine) return null;

  // Board settings
  const squareSize = 100;
  const boardSize = 3 * squareSize;
  const padding = 50; // ⬅ Add extra space around the board

  // Compute center of winning line
  const rowCoords = winningLine.map(index => Math.floor(index / 3) * squareSize + squareSize / 2);
  const colCoords = winningLine.map(index => (index % 3) * squareSize + squareSize / 2);

  const centerX = (Math.min(...colCoords) + Math.max(...colCoords)) / 2;
  const centerY = (Math.min(...rowCoords) + Math.max(...rowCoords)) / 2;

  // Determine ellipse dimensions
  let ellipseWidth, ellipseHeight, rotation = 0;
  if (rowCoords[0] === rowCoords[1]) {
    // Horizontal
    ellipseWidth = squareSize * 3.2;
    ellipseHeight = squareSize * 1.2;
  } else if (colCoords[0] === colCoords[1]) {
    // Vertical
    ellipseWidth = squareSize * 1.2;
    ellipseHeight = squareSize * 3.2;
  } else {
    // Diagonal (increase width significantly)
    ellipseWidth = squareSize * 4.2;
    ellipseHeight = squareSize * 1.5;
    rotation = winningLine[0] === 0 ? 45 : -45; // ↘ or ↙
  }

  // Calculate stroke animation
  const circumference = Math.PI * (3 * (ellipseWidth + ellipseHeight) - Math.sqrt((3 * ellipseWidth + ellipseHeight) * (ellipseWidth + 3 * ellipseHeight)));

  return (
    <svg
      className="winning-overlay"
      width={boardSize + 2 * padding}  // ⬅ Increased size
      height={boardSize + 2 * padding} // ⬅ Increased size
      viewBox={`-${padding} -${padding} ${boardSize + 2 * padding} ${boardSize + 2 * padding}`} // ⬅ Adjust viewBox
    >
      <ellipse
        cx={centerX}
        cy={centerY}
        rx={ellipseWidth / 2}
        ry={ellipseHeight / 2}
        stroke="rgb(88 196 220)"
        strokeWidth="5"
        fill="transparent"
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset === null ? circumference : dashOffset}
        transform={`rotate(${rotation}, ${centerX}, ${centerY})`}
        style={{
          transition: dashOffset === null ? "none" : "stroke-dashoffset 1s ease-out",
        }}
      />
    </svg>
  );
}
