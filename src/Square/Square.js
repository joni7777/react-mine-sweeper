import React, {Component} from 'react';

import './Square.css';

class Square extends Component {
	constructor (){
		super();
		this.state = {
			clicked: false,
			bombed: false,
			className: "closed-square"
		}
	}

	squareClicked(){
		if(this.state.clicked || this.props.gameFinished){
			return;
		}

		if(this.props.bomb){
			this.setState({clicked: true, bombed: true, className: "bombed-square"})
		}else {
			this.setState({clicked: true, className: "clear-square"})
		}

		this.props.squareClicked(this.props.bomb);
	}

	render() {

		return (
			<div className={this.state.className + " square"} onClick={() => this.squareClicked()}>
			</div>
		);
	}
}

export default Square;
