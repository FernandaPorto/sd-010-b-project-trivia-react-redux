import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getStorage } from '../services/token';

class Feedback extends Component {
  render() {
    const { player: { score, assertions } } = getStorage();
    const assert = 3;
    return (
      <div>
        <Header pontuacao={ score } />
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <p data-testid="feedback-text">
          { assertions >= assert
            ? 'Mandou bem!' : 'Podia ser melhor...' }
        </p>
        <Link
          data-testid="btn-play-again"
          to="/"
        >
          Jogar novamente
        </Link>
        <Link
          data-testid="btn-ranking"
          to="/ranking"
        >
          Ver Ranking
        </Link>
      </div>
    );
  }
}

export default Feedback;
