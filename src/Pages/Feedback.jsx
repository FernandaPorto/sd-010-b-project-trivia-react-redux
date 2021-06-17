import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../Components/Header';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.renderPlayAgain = this.renderPlayAgain.bind(this);
    this.state = {
      playAgain: false,
    };
  }

  feedbackMessage() {
    // capturar a quantidade de questões que acertou (assertions - localStore)
    // capturar o score (score - localStore)
    const state = JSON.parse(localStorage.getItem('state'));
    const { player } = state;
    const { assertions, score } = player;
    const MIN_QUESTIONS = 3;
    return (
      <div>
        <p data-testid="feedback-text">
          {assertions < MIN_QUESTIONS ? 'Podia ser melhor...' : 'Mandou bem!'}
        </p>
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
      </div>
    );
  }

  renderPlayAgain() {
    this.setState({ playAgain: true });
  }

  render() {
    const { playAgain } = this.state;
    if (playAgain) return <Redirect to="/" />;
    return (
      <div>
        <Header />
        {this.feedbackMessage()}
        <button
          type="button"
          onClick={ this.renderPlayAgain }
          data-testid="btn-play-again"
        >
          Jogar Novamente
        </button>
      </div>
    );
  }
}
export default Feedback;
