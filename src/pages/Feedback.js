import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default class Feedback extends React.Component {
  verifyAssertions() {
    const { player: { assertions, score } } = JSON.parse(localStorage.getItem('state'));
    const TRES = 3;
    if (assertions < TRES) {
      return (
        <section>
          <h1 data-testid="feedback-text">Podia ser melhor...</h1>
          <p data-testid="feedback-total-score">{ score }</p>
          <p data-testid="feedback-total-question">{ assertions }</p>
        </section>
      );
    }
    return (
      <section>
        <h1 data-testid="feedback-text">Mandou bem!</h1>
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
      </section>
    );
  }

  render() {
    return (
      <div data-testid="feedback-text">
        <Header />
        { this.verifyAssertions() }
        <Link to="/" data-testid="btn-play-again">
          <button type="button">Jogar Novamente</button>
        </Link>
        <Link to="/ranking" data-testid="btn-ranking">
          <button type="button">Ver Ranking</button>
        </Link>
      </div>
    );
  }
}
