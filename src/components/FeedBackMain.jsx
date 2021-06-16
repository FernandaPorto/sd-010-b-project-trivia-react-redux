import React, { Component } from 'react';

class FeedBackMain extends Component {
  constructor(props) {
    super(props);
    this.renderFeedback = this.renderFeedback.bind(this);
  }

  renderFeedback() {
    const three = 3;
    const playerAnswer = localStorage.getItem('player');
    const correct = JSON.parse(playerAnswer);
    if (correct.score < three) {
      return <p data-testid="feedback-text"> Podia ser melhor... </p>;
    }
    return <p data-testid="feedback-text"> Mandou bem! </p>;
  }

  render() {
    return (
      <section>
        {this.renderFeedback()}
      </section>
    );
  }
}

export default FeedBackMain;
