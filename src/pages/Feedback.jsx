import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';

class Feedback extends React.Component {
  constructor() {
    super();
    const state = JSON.parse(localStorage.getItem('state'));
    this.assertions = state.player.assertions;
    this.score = state.player.score;
  }

  feedbackMessage() {
    if (this.assertions <= 2) {
      return (<p>Podia ser melhor...</p>);
    }
    return (<p>Mandou bem!</p>);
  }

  render() {
    return (
      <main>
        <Header />
        <section>
          { this.feedbackMessage() }
          <div>
            <span>Número de acertos: </span>
            <span>{this.assertions}</span>
          </div>
          <div>
            <span>Pontuação final: </span>
            <span>{this.score}</span>
          </div>
          <button type="button">
            <Link to="/">Jogar novamente</Link>
          </button>
          <button type="button">
            <Link to="/ranking">Ranking</Link>
          </button>
        </section>
      </main>
    );
  }
}

export default Feedback;
