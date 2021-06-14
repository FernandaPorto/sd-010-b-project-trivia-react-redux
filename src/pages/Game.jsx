import React from 'react';
import { connect } from 'react-redux';

class Game extends React.Component {
  render() {
    return (
      <h2>Game</h2>
    );
  }
}

export default connect()(Game);
