import React from 'react';
import { connect } from 'react-redux';
import GameHeader from './GameHeader';

class Game extends React.Component {
  render() {
    return (
      <>
        <h2>Game</h2>
        <GameHeader />
      </>
    );
  }
}

export default connect()(Game);
