import _ from 'lodash';
import React, {Component} from 'react';

import './Board.css'
import Square from '../Square/Square.js'

class Board extends Component {
	render() {
		let squareIndex = -1;
		const {squares, squareClicked, amountOfRows} = this.props;
		const squaresRows = _.chunk(squares, amountOfRows);

		return (
			<div className="board-container">
				{
					squaresRows.map((squaresRow, rowIndex) => {
						return <div className="board-row" key={rowIndex}>
							{
								squaresRow.map((square) => {
									squareIndex++;
									return <Square key={squareIndex}
												   index={squareIndex}
												   bombed={square.bombed}
												   cleared={square.cleared}
												   squareClicked={squareClicked}/>;
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
