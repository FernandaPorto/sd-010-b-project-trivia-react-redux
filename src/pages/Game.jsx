import React from 'react';
import Header from '../components/Header';

class Game extends React.Component {
  componentDidMount() {
    this.requestTrivia();
  }

  requestTrivia() {
    const token = localStorage.getItem('token');
    return fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  render() {
    return (
      <>
        <Header />
        <h1>temp</h1>
      </>
    );
  }
}

export default Game;
