import React, { Component } from 'react';
import GameHeader from '../components/GameHeader';

class Game extends Component {
  render() {
    return (
      <>
        <GameHeader />
        <div>Corpo da tela de jogo</div>
      </>
    );
  }
}

export default Game;
