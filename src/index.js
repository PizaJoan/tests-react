import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import calculateWinner from './utils/calculate-winner.js'

function Square(props) {

    return (
        <button 
            className="square" 
            onClick={props.onClick}
        >
            {props.value}
        </button>
    )
}

function Board(props) {

    function renderSquare(i) {
        return (
            <Square 
                value={props.squares[i]}
                onClick={() => props.onClick(i)}
            />
        )
    }

    return (
        <div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    )
}

class Game extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                },
            ],
            xIsNext: true,
            currentSquares: 0,
        }
    }

    handleClick(i) {
        console.log(this.state)
        const history = this.state.history.slice(0, this.state.currentSquares + 1)
        const squares = history[history.length - 1].squares.slice()

        if (!calculateWinner(squares) && squares[i] === null) {

            squares[i] = this.state.xIsNext ? 'X' : 'O'

            this.setState({
                history: history.concat([{ squares }]),
                xIsNext: !this.state.xIsNext,
                currentSquares: history.length,
            })
        }
    }

    jumpTo(move) {

        this.setState({
            currentSquares: move,
            xIsNext: move % 2 === 0,
        })
    }

    render() {
        const history = this.state.history
        const current = history[this.state.currentSquares]
        const winner = calculateWinner(current.squares)
        const moves = history.map((step, move) => {

            const description = `Go to ${move ? `move #${move}` : 'game start'}`
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>
                        {description}
                    </button>
                </li>
            )
        })

        let status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`
        if (winner) status = `Winner: ${winner}`

        
        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={current.squares}
                        onClick={this.handleClick.bind(this)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        )
    }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"))
