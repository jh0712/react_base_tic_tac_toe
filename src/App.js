import React from 'react';
import {useState} from 'react';

function Board({xIsNext,squares,onPlay}) {
    const winner = calculateWinner(squares);
    let status;
    if(winner){
        status  = 'Winner: ' + winner;
    }else{
        status = 'Next Player: '+ (xIsNext ? "X":"O");
    }
    // write this as a function ,because we need do those thing after user click button.
    function handleClick(i) {
        // if i has value or someone win this game
        // do nothing
        if (squares[i] || winner) {
            return;
        }
        // write this on following because do not wast memory
        // const nextSquares = squares.slice();
        const nextSquares = [...squares];
        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        onPlay(nextSquares);
    }
    let squareList = squares.map((value,index)=>{
        return  <Square key={index} value={squares[index]} onSquareClick={() => handleClick(index)}></Square>
    });
    const squareContainer = new Array(3).fill(0).map((_, idx) => {
        return <div key={idx} className="board-row">
            {squares.slice(idx *3, 3 * idx + 3).map((square, sIdx) => {
                let count =idx * 3 + sIdx;
                return <Square value={square} key={count} onSquareClick={() => handleClick(count)} />
            })}
        </div>
    })
    let arrIndex = -1;
    const squareContainer2 = new Array(3).fill(0).map((_,idx2)=>{
        return <div key={idx2} className="board-row">
            {squares.slice(idx2*3,3*idx2+3).map((square,_)=>{
                arrIndex += 1;
                let temp = arrIndex;
                // {() => handleClick(arrIndex)}
                // if use arrIndex , react rerender will call arrIndex out of this function.
                return <Square value={square} key={arrIndex} onSquareClick={() => handleClick(temp)} />
            })}
        </div>
    })
    return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">method 1</div>
            {squareContainer}
            <div className="board-row">{'-'.repeat(20)}</div>
            <div className="board-row">method 2</div>
            {squareList}
            <div className="board-row">{'-'.repeat(20)}</div>
            <div className="board-row">method 3</div>
            {squareContainer2}
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


export default function Game() {
    // when 0 then xIsNext = true
    // when 1 then xIsNext = false
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [order, setOrder] = useState(true);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }
    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }
    function changeOrder() {
        setOrder(!order);
    }

    const moves = history.map((squares, move) => {
        // when order true asc 1,2,3,4
        // when order false desc 4,3,2,1
        // 0 will be same
        let description,button, moveNumber;
        moveNumber = 0;
        if (move > 0) {
            moveNumber = order? move: history.length -move ;
            description = 'Go to move #' + moveNumber;
        } else {
            description = 'Go to game start';
        }
        let textShowIndex;
        textShowIndex = order ? history.length-1 : 1;
        if(move === textShowIndex){
            button = <h4 onClick={() => jumpTo(moveNumber)}>{description}</h4>;
        }else{
            button = <button onClick={() => jumpTo(moveNumber)}>{description}</button>;
        }

        return (
            <div key={move}>
                {button}
            </div>
        );
    });

    return (
        <div>
            <h1> this is from game function</h1>
            <div className="game">
                <div className="game-board">
                    <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
                </div>
                <div className="game-info">
                    <ul>{moves}</ul>
                </div>
                <div className="game-info">
                    <button  onClick={()=>changeOrder()}>change order</button>
                </div>
            </div>
        </div>

    );
}
