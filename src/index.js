import React from "react"
import ReactDOM from "react-dom"
import "./index.css"


// Punt actual: https://reactjs.org/tutorial/tutorial.html#lifting-state-up

/*class Square extends React.Component {

    render() {
        return (
            <button 
                className="square" 
                onClick={this.props.onClick}
            >
                {this.props.value}
            </button>
        )
    }
}*/

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

class Board extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            squares: Array(9).fill(null),
        }
    }

    handleClick(i, e) {
        this.setState((state, props) => {
            state.squares[i] = 'X'
            return state
        })
    }

    renderSquare(i) {
        return <Square 
            value={this.state.squares[i]}
            onClick={this.handleClick.bind(this, i)}
        />
    }

    render() {
        const status = "Next player: X"

        return (
            <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
            </div>
            <div className="board-row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
            </div>
            <div className="board-row">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
            </div>
            </div>
        )
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        )
    }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"))