import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FeedBackMain extends Component {
  constructor(props) {
    super(props);
    this.renderFeedback = this.renderFeedback.bind(this);
  }

  renderFeedback() {
    const three = 3;
    const playerAnswer = localStorage.getItem('state');
    const correct = JSON.parse(playerAnswer);
    if (correct.player.assertions < three) {
      return <p data-testid="feedback-text"> Podia ser melhor... </p>;
    }
    return <p data-testid="feedback-text"> Mandou bem! </p>;
  }

  renderFinal() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { assertions } = state.player;
    const { score } = state.player;
    return (
      <section>
        <p>
          Você acertou
          <span data-testid="feedback-total-question">{assertions}</span>
          e fez
          <span data-testid="feedback-total-score">{score}</span>
          pontos!
        </p>
        <Link to="/" data-testid="btn-play-again">
          <button type="button">
            Jogar Novamente
          </button>
        </Link>
        <Link to="/ranking" data-testid="btn-ranking">
          <button type="button">
            Ver Ranking
          </button>
        </Link>

      </section>
    );
  }

  render() {
    return (
      <section>
        {this.renderFeedback()}
        {this.renderFinal()}
      </section>
    );
  }
}

export default FeedBackMain;
