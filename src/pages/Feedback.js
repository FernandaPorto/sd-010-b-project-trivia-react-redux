import React from 'react';
import Header from '../components/Header';

export default class Feedback extends React.Component {
  verifyAssertions() {
    const { player: { assertions } } = JSON.parse(localStorage.getItem('state'));
    const TRES = 3;
    if (assertions < TRES) {
      return <h1 data-testid="feedback-text">Podia ser melhor...</h1>;
    }
    return <h1 data-testid="feedback-text">Mandou bem!</h1>;
  }

  render() {
    return (
      <div data-testid="feedback-text">
        <Header />
        { this.verifyAssertions() }
      </div>
    );
  }
}
