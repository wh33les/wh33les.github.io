import React, { useState, useEffect } from "react";
import "./c4appstyles.css";

const ROWS = 6;
const COLS = 7;

const ConnectFour = () => {
    const [board, setBoard] = useState(Array(ROWS).fill(null).map(() => Array(COLS).fill(null)));
    const [currentPlayer, setCurrentPlayer] = useState("red");
    const [winner, setWinner] = useState(null);
    const [hoveredCol, setHoveredCol] = useState(null);

    const dropPiece = (col) => {
        if (winner) return; // Prevent moves after a win

        // Find the lowest empty row in the column
        for (let row = ROWS - 1; row >= 0; row--) {
            if (!board[row][col]) {
                // Place the piece on the board
                const newBoard = board.map((r) => [...r]);
                newBoard[row][col] = currentPlayer;
                setBoard(newBoard);

                // Check for a winner
                if (checkWinner(newBoard, row, col, currentPlayer)) {
                    setWinner(currentPlayer);
                } else {
                    setCurrentPlayer(currentPlayer === "red" ? "yellow" : "red");
                }

                return;
            }
        }
    };

    const checkWinner = (board, row, col, player) => {
        // Directions: Horizontal, Vertical, Diagonal /
        const directions = [
            [[0, 1], [0, -1]],   // Horizontal
            [[1, 0], [-1, 0]],   // Vertical
            [[1, 1], [-1, -1]],  // Diagonal \
            [[1, -1], [-1, 1]],  // Diagonal /
        ];

        for (let [[dr1, dc1], [dr2, dc2]] of directions) {
            let count = 1;
            for (let [dr, dc] of [[dr1, dc1], [dr2, dc2]]) {
                let r = row + dr, c = col + dc;
                while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === player) {
                    count++;
                    r += dr;
                    c += dc;
                }
            }
            if (count >= 4) return true; // Win condition
        }
        return false;
    };

    return (
        <div>
            <div className="c4-status"><h3>
                {winner ? `Winner: ${winner.toUpperCase()}` : `Next player: ${currentPlayer.toUpperCase()}`}
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
