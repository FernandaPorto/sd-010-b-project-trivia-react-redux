import React, { Component } from 'react';
import GameAsks from '../components/GameAsks';
import HeaderComponent from '../components/HeaderComponent';

class GamePage extends Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    return (
      <>
        <HeaderComponent />
        <GameAsks />
      </>
    );
  }
}

export default GamePage;
