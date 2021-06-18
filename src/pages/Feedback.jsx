import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import HeaderFeedback from '../components/HeaderFeedback';

class Feedback extends React.Component {
  constructor() {
    super();
    const state = JSON.parse(localStorage.getItem('state'));
    this.assertions = state.player.assertions;
    this.score = state.player.score;
  }

  feedbackMessage() {
    if (this.assertions <= 2) {
      return (<p data-testid="feedback-text">Podia ser melhor...</p>);
    }
    return (<p data-testid="feedback-text">Mandou bem!</p>);
  }
  
  render() {
    return (
      <main>
        <HeaderFeedback />
        <section>
          { this.feedbackMessage() }
          <div>
            <span>Número de acertos: </span>
            <span data-testid="feedback-total-question">{this.assertions}</span>
          </div>
          <div>
            <span>Pontuação final: </span>
            <span data-testid="feedback-total-score">{this.score}</span>
          </div>
          <button type="button" data-testid="btn-play-again">
            <Link to="/">Jogar novamente</Link>
          </button>
        </section>
      </main>
    );
  }
}

export default Feedback;
