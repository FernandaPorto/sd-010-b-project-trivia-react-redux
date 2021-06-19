import React from 'react';

import Header from '../components/Header';
import TriviaGame from '../components/TriviaGame';

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
