import React from 'react';
import { useState } from 'react';
// commit push test
export default function Board() {
    const [squares,setSquare] = useState(Array(9).fill(null))
    function handleClick(i) {
        // const nextSquares = squares.slice();
        // nextSquares[i] = "X";
        // setSquare(nextSquares);
        squares[i] = 'X';
        setSquare(squares);
    }
    return (
        <div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)}></Square>
                <Square value={squares[1]}></Square>
                <Square value={squares[2]} ></Square>
            </div>
            <div className="board-row">
                <Square ></Square>
                <Square ></Square>
                <Square ></Square>
            </div>
            <div className="board-row">
                <Square ></Square>
                <Square ></Square>
                <Square ></Square>
            </div>
        </div>
    );
}
function Square({value ,onSquareClick}) {
    // const [value, setValue] = useState(null);
    // function handleClick() {
    //     setValue('X')
    // }
    return <button className="square" onClick={onSquareClick}>{value}</button>;
    // return <button className="square" >{value}</button>;
}

