import _ from 'lodash';
import React, {Component} from 'react';

import './Board.css'
import Square from '../Square/Square.js'

class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			squares: new Array(this.props.columns * this.props.rows).fill(null),
			amountOfSquaresClicked: 0,
			gameFinished: false
		}
	}

	createBombIndexes(amount, maxIndex) {
		let bombIndexes = [];

		while (bombIndexes.length < amount) {
			let bombIndex = _.random(maxIndex);

			if (_.includes(bombIndexes, bombIndex)) {
				continue;
			}

			bombIndexes.push(bombIndex);
		}

		return bombIndexes;
	}

	squareClicked(isBombClicked) {
		this.setState({amountOfSquaresClicked: this.state.amountOfSquaresClicked + 1});

		if (isBombClicked) {
			this.props.gameFinished(true);
			this.setState({gameFinished: true});
		} else if (this.state.amountOfSquaresClicked >= this.state.squares.length - this.props.bombs) {
			this.props.gameFinished(false);
			this.setState({gameFinished: true});
		}
	}

	render() {
		let squareIndex = 0;
		let bombIndexes = this.createBombIndexes(this.props.bombs, this.state.squares.length - 1);

		return (
			<div className="board-container">
				{
					_.chunk(this.state.squares, this.props.rows).map((squareRows, rowIndex) => {
						return <div className="board-row" key={rowIndex}>
							{
								squareRows.map(() => {
									squareIndex++;
									return <Square key={squareIndex}
												   bomb={_.includes(bombIndexes, squareIndex)}
												   squareClicked={(isBombClicked) => this.squareClicked(isBombClicked)}
												   gameFinished={this.state.gameFinished}/>;
								})
							}
						</div>
					})
				}
			</div>
		);
	}
}

export default Board;
