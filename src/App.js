import React from 'react';
import {useState} from 'react';
// commit push test

export default function Game() {
    return (
        <div>
            <h1> this is from game function</h1>
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <ol>{/*TODO*/}</ol>
                </div>
            </div>
        </div>

    );
}

function Board() {
    const [squares, setSquare] = useState(Array(9).fill(null));
    const [xIsTheNext, setXIsTheNext] = useState(true);
    const winner = calculateWinner(squares);
    let status;
    if(winner){
        status  = 'Winner: ' + winner;
    }else{
        status = 'Next Player: '+ (xIsTheNext ? "X":"O");
    }
    function handleClick(i) {
        // if i has value or someone win this game
        // do nothing
        if (squares[i] || winner) {
            return;
        }
        // write this on following because do not wast memory
        const nextSquares = squares.slice();
        if (xIsTheNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        setXIsTheNext(!xIsTheNext);
        setSquare(nextSquares);
    }

    return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)}></Square>
                <Square value={squares[1]} onSquareClick={() => handleClick(1)}></Square>
                <Square value={squares[2]} onSquareClick={() => handleClick(2)}></Square>
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)}></Square>
                <Square value={squares[4]} onSquareClick={() => handleClick(4)}></Square>
                <Square value={squares[5]} onSquareClick={() => handleClick(5)}></Square>
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)}></Square>
                <Square value={squares[7]} onSquareClick={() => handleClick(7)}></Square>
                <Square value={squares[8]} onSquareClick={() => handleClick(8)}></Square>
            </div>
        </div>
    );
}

function Square({value, onSquareClick}) {
    // const [value, setValue] = useState(null);
    // function handleClick() {
    //     setValue('X')
    // }
    return <button className="square" onClick={onSquareClick}>{value}</button>;
    // return <button className="square" >{value}</button>;
}

function calculateWinner(squares) {
    // To check the winner
    const lines = [
        [0, 1, 2], // first line
        [3, 4, 5], // second line
        [6, 7, 8], // third line
        [0, 3, 6], // first row
        [1, 4, 7], // second row
        [2, 5, 8], // third row
        [0, 4, 8], // cross from left corner to right corner
        [2, 4, 6] // cross from right corner to left corner
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        // squares[a] has value and squares[a] == b , and a = c
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            // return value
            return squares[a];
        }
    }
    return null;
}

