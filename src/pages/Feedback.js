import React from 'react';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';

import Header from '../components/Header';

class Feedback extends React.Component {
  verifyAssertions() {
    const { player: { assertions, score, name, gravatarEmail } } = JSON
      .parse(localStorage.getItem('state'));
    const hashEmail = `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}`;
    const TRES = 3;
    if (localStorage.getItem('ranking')) {
      console.log('cheguei');
      let rank = JSON.parse(localStorage.getItem('ranking'));
      rank = [...rank, { score, name, picture: hashEmail }];
      localStorage.setItem('ranking', JSON.stringify(rank));
    } else {
      console.log('aqui');
      localStorage.setItem('ranking', JSON
        .stringify([{ name, score, picture: hashEmail }]));
    }
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
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}

export default Feedback;
