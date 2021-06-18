import React from 'react';

import HeaderFeedback from '../components/HeaderFeedback';

class Feedback extends React.Component {
  constructor() {
    super();
    const state = JSON.parse(localStorage.getItem('state'));
    console.log(state);
    this.assertions = state.player.assertions;
    this.score = state.player.score;
  }

  feedbackMessage() {
    console.log(this.assertions);
    if (this.assertions <= 2) {
      return (<p data-testid="feedback-text">Podia ser melhor...</p>);
    }
    return (<p data-testid="feedback-text">Mandou bem!</p>);
  }

  render() {
    // const { assertions, score } = this.props;
    // console.log(assertions);
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
        </section>
      </main>
    );
  }
}

export default Feedback;
