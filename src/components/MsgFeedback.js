import React, { Component } from 'react';

class MsgFeedback extends Component {
  render() {
    // const { feedback } = this.props;
    const numberMax = 10;
    const feedback = Math.floor(Math.random() * numberMax);
    const numberOfHits = 3;
    return (
      <section>
        {feedback < numberOfHits
          && <p data-testid="feedback-text">Podia ser melhor...</p>}
        {feedback >= numberOfHits
          && <p data-testid="feedback-text">Mandou bem!</p>}
      </section>
    );
  }
}

export default MsgFeedback;
