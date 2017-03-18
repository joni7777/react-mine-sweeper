import React, {Component} from 'react';

import './Square.css';

export default class Square extends Component {
	render() {
		const {bombed, cleared, index, squareClicked} = this.props;
		return (
			<div className={"square " + (cleared ? 'clear-square' : bombed ? 'bombed-square' : '')} onClick={() => {
				!bombed && !cleared && squareClicked(index);
			}}>
			</div>
		);
	}
}