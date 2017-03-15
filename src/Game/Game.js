import _ from 'lodash';
import React, {Component} from 'react';

import './Game.css';
import logo from '../logo.svg';
import Board from '../Board/Board.js'

class Game extends Component {
	constructor() {
		super();
		this.state = {
			gameStatus: "Playing...",
			rows: 4,
			columns: 4,
			bombs: 4,
			boardId: _.uniqueId()
		};
	}

	gameFinished(isBombClicked) {
		let newGameStatus = isBombClicked ? "Lost!" : "Won!";

		this.setState({gameStatus: newGameStatus});
	}

	resetGame() {
		this.setState({
			gameStatus: "Playing...",
			boardId: _.uniqueId()
		});
	}

	settingsChanged(settingName, newValue) {
		let stateChangeSet = {};
		stateChangeSet[settingName] = newValue;
		stateChangeSet.boardId = _.uniqueId();

		this.setState(stateChangeSet);

	}


	render() {
		return (
			<div className="game">
				<div className="game-header">
					<img src={logo} className="game-logo" alt="Game"/>
					<h2>Welcome to React Mine Sweeper</h2>
					<span>{this.state.gameStatus}</span>
				</div>
				<div className="game-board">
					<div className="game-settings">
						<div className="field-container">
							<label htmlFor="rows">Rows:</label>
							<input id="rows" type="number" value={this.state.rows}
								   onChange={(event) => this.settingsChanged('rows', event.target.value)}/>
						</div>
						<div className="field-container">
							<label htmlFor="columns">Columns:</label>
							<input id="columns" type="number" value={this.state.columns}
								   onChange={(event) => this.settingsChanged('columns', event.target.value)}/>
						</div>
						<div className="field-container">
							<label htmlFor="bombs">Bombs:</label>
							<input id="bombs" type="number" value={this.state.bombs}
								   onChange={(event) => this.settingsChanged('bombs', event.target.value)}/>
						</div>
						<button className="set-board-button" onClick={() => this.resetGame()}>Reset Game</button>
					</div>
					{

						<Board key={this.state.boardId} columns={this.state.columns} rows={this.state.rows}
							   bombs={this.state.bombs}
							   gameFinished={(isBombClicked) => this.gameFinished(isBombClicked)}/>
					}
				</div>
			</div>
		);
	}
}

export default Game;
