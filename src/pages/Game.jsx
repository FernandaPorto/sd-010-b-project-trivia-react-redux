import React, { Component } from 'react';
import Header from '../components/Header';

class Game extends Component {
  componentDidMount() {
    fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((response) => {
        localStorage.setItem('token', `${response.token}`);
      });
  }

  render() {
    return (
      <div>
        <Header />
        jogo
      </div>
    );
  }
}

export default Game;
