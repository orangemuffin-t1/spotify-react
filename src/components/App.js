import React, { Component } from 'react';
import logo from '../logo.svg';
import '../styles/App.css';
import Player from './Player.js'

import { authEndpoint, clientId, redirectUri, scopes } from "./config.js"

class App extends Component {
  constructor() {
    super();
    this.state = {
      item: "",
      progress_ms: 0,
      results: ""
    };
  }
  componentDidMount() {
    let url = window.location.href;
        
    if (url.indexOf("token=") > -1) { 
      this.authToken = url
                      .split("token=")[1]
                      .split("&")[0]
                      .trim();
      this.setState({
        loggedIn: true,
      });

      this.getCurrentlyPlaying(this.authToken);
    }
  }

  getCurrentlyPlaying(token) {
    fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      method: 'GET',
      headers: new Headers({
        'Authorization': 'Bearer ' + token
      })
    })
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          results: result.item.name + " by" + result.item.artists.map((artist) => " " + artist.name)
        });
      },
      (error) => {
        this.setState({
          results: "No Music Playing..."
        });
      }
    );
  }

  render() {
    return(
      <div className="App">
        <div className="App-header">
          {!this.state.loggedIn && (
            <div>
              <a className="btn login-btn" 
                href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
              > Login to Spotify </a>
            </div>
          )}

          {this.state.loggedIn && (
            <Player item={this.state.results} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
