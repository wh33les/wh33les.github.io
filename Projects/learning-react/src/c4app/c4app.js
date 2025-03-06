import React, { useState } from "react";
import "./c4appstyles.css";

const pieceSound = new Audio(process.env.PUBLIC_URL + "/sounds/piece.mp3");
const winXSound = new Audio(process.env.PUBLIC_URL + "/sounds/win-x.mp3");
const winOSound = new Audio(process.env.PUBLIC_URL + "/sounds/win-o.mp3");

const ROWS = 6;
const COLS = 7;

const ConnectFour = () => {
    const [board, setBoard] = useState(Array(ROWS).fill(null).map(() => Array(COLS).fill(null)));
    const [currentPlayer, setCurrentPlayer] = useState("red");
    const [winner, setWinner] = useState(null);
    const [hoveredCol, setHoveredCol] = useState(null);
    const [winningCells, setWinningCells] = useState([]);

    const dropPiece = (col) => {
        if (winner) return; // Prevent moves after a win

        for (let row = ROWS - 1; row >= 0; row--) {
            if (!board[row][col]) {
                const newBoard = board.map((r) => [...r]);
                newBoard[row][col] = currentPlayer;
                setBoard(newBoard);

                // Play sound with a fresh instance
                const pieceSoundInstance = new Audio(pieceSound.src);
                pieceSoundInstance.play();

                const winPositions = checkWinner(newBoard, row, col, currentPlayer);
                if (winPositions) {
                    setWinner(currentPlayer);
                    setWinningCells(winPositions);
                    if (currentPlayer === "red") {
                        const winXSoundInstance = new Audio(winXSound.src);
                        winXSoundInstance.play();
                    } else {
                        const winOSoundInstance = new Audio(winOSound.src);
                        winOSoundInstance.play();
                    }
                }

                setCurrentPlayer(currentPlayer === "red" ? "yellow" : "red");
                return;
            }
        }
    };


    const checkWinner = (board, row, col, player) => {
        const directions = [
            [[0, 1], [0, -1]],   // Horizontal
            [[1, 0], [-1, 0]],   // Vertical
            [[1, 1], [-1, -1]],  // Diagonal \
            [[1, -1], [-1, 1]],  // Diagonal /
        ];

        for (let [[dr1, dc1], [dr2, dc2]] of directions) {
            let count = 1;
            let winningCells = [[row, col]]; // Start with the current piece

            for (let [dr, dc] of [[dr1, dc1], [dr2, dc2]]) {
                let r = row + dr, c = col + dc;
                while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === player) {
                    winningCells.push([r, c]);
                    count++;
                    r += dr;
                    c += dc;
                }
            }
            if (count >= 4) {
                return winningCells; // Return winning coordinates
            }
        }
        return null;
    };


    return (
        <div>
            <div className="c4-status"><h3>
                {winner ? (
                    <span className="player-indicator">
                        Winner: <span className={`piece ${winner}`}></span>
                    </span>
                ) : (
                    <span className="player-indicator">
                        Next player: <span className={`piece ${currentPlayer}`}></span>
                    </span>
                )}
            </h3></div>
            <div className="c4board">
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((cell, colIndex) => {
                            // Check if this column is being hovered
                            const isHovered = hoveredCol === colIndex;

                            return (
                                <div
                                    key={colIndex}
                                    className={`cell ${cell || (isHovered ? "hovered" : "empty")}`}
                                    onMouseEnter={() => setHoveredCol(colIndex)}
                                    onMouseLeave={() => setHoveredCol(null)}
                                    onClick={() => dropPiece(colIndex)}
                                >
                                    {/* Just render the pieces already placed */}
                                    {/* Render the piece and apply the "winning" class if it's a winning cell */}
                                    {cell && <div className={`piece ${cell}`}></div>}

                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
            <button className="c4-button" onClick={() => { setBoard(Array(ROWS).fill(null).map(() => Array(COLS).fill(null))); setWinner(null); setCurrentPlayer("red"); }}>
                Restart Game
            </button>
        </div>
    );
};

export default ConnectFour;
