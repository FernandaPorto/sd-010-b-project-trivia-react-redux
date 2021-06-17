import React, { Component } from 'react';

class MsgTotalPlacar extends Component {
  render() {
    const score = 190;
    const hits = 4;
    return (
      <div>
        <p data-testid="feedback-total-score">{`Placar: ${score}`}</p>
        <p data-testid="feedback-total-question">{`Número de acertos: ${hits}`}</p>
      </div>
    );
  }
}

export default MsgTotalPlacar;
