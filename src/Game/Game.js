import _ from 'lodash';
import React from 'react';

import './Game.css';
import logo from '../logo.svg';
import Board from '../Board/Board.js'

export default class Game extends React.Component {
	state = {
		gameStatus: 0,
		rows: 4,
		columns: 4,
		bombs: 4,
		bombsIndexes: createBombIndexes(4, 15),
		boardId: _.uniqueId(),
		squares: createNewSquaresArray(4 * 4),
		squaresClicked: 0
	};

	squareClicked(index) {
		let {squares, bombsIndexes, squaresClicked, gameStatus} = this.state;

		if(gameStatus !== 0){return;}

		squaresClicked++;

		let changeSet = {squares, squaresClicked};

		if(_.includes(bombsIndexes, index)){
			squares[index].bombed = true;
			changeSet.gameStatus = -1;
		}else{
			squares[index].cleared = true;
		}

		if(squaresClicked === squares.length - bombsIndexes.length){
			changeSet.gameStatus = 1;
		}

		this.setState(changeSet);

	}

	resetGame() {
		const {rows, columns, bombs} = this.state;
		const amountOfSquares = rows * columns;

		this.setState({
			gameStatus: 0,
			boardId: _.uniqueId(),
			bombsIndexes: createBombIndexes(bombs, amountOfSquares),
			squares: createNewSquaresArray(amountOfSquares),
			squaresClicked: 0
		});
	}

	settingsChanged(settingName, newValue) {
		let newSetting = {};
		newSetting[settingName] = newValue;

		this.setState(newSetting, this.resetGame);
	}


	render() {
		let {rows, columns, bombs, squares, gameStatus, boardId} = this.state;

		return (
			<div className="game">
				<div className="game-header">
					<img src={logo} className="game-logo" alt="Game"/>
					<h2>Welcome to React Mine Sweeper</h2>
					<span>{gameStatus === 0 ? "Playing..." : gameStatus === 1 ? "Won!" : "Lost!"}</span>
				</div>
				<div className="game-board">
					<div className="game-settings">
						<div className="field-container">
							<label htmlFor="rows">Rows:</label>
							<input id="rows" type="number" value={rows}
								   onChange={(event) => this.settingsChanged('rows', parseInt(event.target.value, 10))}/>
						</div>
						<div className="field-container">
							<label htmlFor="columns">Columns:</label>
							<input id="columns" type="number" value={columns}
								   onChange={(event) => this.settingsChanged('columns', parseInt(event.target.value, 10))}/>
						</div>
						<div className="field-container">
							<label htmlFor="bombs">Bombs:</label>
							<input id="bombs" type="number" value={bombs}
								   onChange={(event) => this.settingsChanged('bombs', parseInt(event.target.value, 10))}/>
						</div>
						<button className="set-board-button" onClick={() => this.resetGame()}>Reset Game</button>
					</div>
					{
						<Board key={boardId} squares={squares} amountOfRows={rows} squareClicked={(index) => this.squareClicked(index)}/>
					}
				</div>
			</div>
		);
	}
}

function createBombIndexes(amount, maxIndex) {
	let bombIndexes = [];

	while (bombIndexes.length < amount && bombIndexes.length <= maxIndex) {
		let bombIndex = _.random(maxIndex);

		if (_.includes(bombIndexes, bombIndex)) {
			continue;
		}

		bombIndexes.push(bombIndex);
	}

	return bombIndexes;
}

function createNewSquaresArray(size) {
	return new Array(size).fill(null).map(() => { return {} });
}