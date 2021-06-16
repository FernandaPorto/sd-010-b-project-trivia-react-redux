import React from 'react';
import Trivia from '../components/TriviaGame';
import Header from '../components/Header';

class Game extends React.Component {
  render() {
    return (
      <div>
        <h1>Game</h1>
        <Header />
        <Trivia />
      </div>
    );
  }
}

export default Game;
