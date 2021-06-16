import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

class Game extends Component {
  render() {
    return (
      <div>
        <Link to="/ranking">Ver Ranking</Link>
        <Header />
        board game
      </div>
    );
  }
}

export default Game;
