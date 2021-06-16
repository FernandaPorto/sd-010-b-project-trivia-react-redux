import React from 'react';
import Trivia from '../components/TriviaGame';
import Header from '../components/Header';

class Game extends React.Component {
  render() {
    return (
      <main>
        <Header />
        <Trivia />
      </main>
    );
  }
}

export default Game;
