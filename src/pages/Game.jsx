import React from 'react';

import TriviaGame from '../components/TriviaGame';
import Header from '../components/Header';

class Game extends React.Component {
  render() {
    return (
      <main>
        <Header />
        <TriviaGame />
      </main>
    );
  }
}

export default Game;
