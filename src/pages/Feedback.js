import React, { Component } from 'react';
import Header from '../components/Header';
import { getStorage } from '../services/token';

class Feedback extends Component {
  render() {
    const { player: { score } } = getStorage();
    return (
      <div>
        <p data-testid="feedback-text">Feedback</p>
        <Header pontuacao={ score } />
      </div>
    );
  }
}

export default Feedback;
