import React, { Component } from 'react';
import logo from '../logo.svg';
import '../styles/Player.css';

class Player extends Component {
	constructor(props) {
		super(props);
	}

	render() {
    return(
      <div id="player_color">
      	<h2>{this.props.item}</h2>
      </div>
    );
  }
}


export default Player;