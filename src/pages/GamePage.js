import React, { Component } from 'react';
import GameHeader from '../components/GameHeader';
import GameTrivia from '../components/GameTrivia';

export default class GamePage extends Component {
  render() {
    return (
      <main>
        <GameHeader />
        <GameTrivia />
      </main>
    );
  }
}
