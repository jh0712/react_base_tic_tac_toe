import React from 'react';
import { useState } from 'react';

export default function Board() {
    return (
        <div>
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
            <div className="board-row">
                <Square ></Square>
                <Square ></Square>
                <Square ></Square>
            </div>
        </div>
    );
}
function Square() {
    const [value, setValue] = useState(null);
    function handleClick() {
        setValue('X')
    }
    return <button className="square" onClick={handleClick}>{value}</button>;
}

