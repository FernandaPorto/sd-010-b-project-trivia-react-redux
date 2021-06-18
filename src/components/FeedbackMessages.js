import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './feedback.css';

class FeedbackMessages extends Component {
  constructor(props) {
    super(props);

    this.messages = this.messages.bind(this);
  }

  componentDidMount() {
    this.messages();
  }

  messages(assertion) {
    const localStorageInfos = JSON.parse(localStorage.getItem('state'));
    const { player: { assertions } } = localStorageInfos;
    const minScore = 3;
    const fail = 'Podia ser melhor...';
    const success = 'Mandou bem!';
    if (assertion < minScore) {
      return `${fail}
      Você acertou ${assertions} de 5.`;
    }
    if (assertion >= minScore) {
      return `${success}
      Você acertou ${assertion} de 5.`;
    }
  }

  render() {
    const localStorageInfos = JSON.parse(localStorage.getItem('state'));
    const { player: { assertions, score } } = localStorageInfos;
    return (
      <div className="feedback">
        <div>
          <span data-testid="feedback-text">{this.messages(assertions)}</span>
        </div>
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">Ver Ranking</button>
        </Link>
        <br />
        <Link to="/">
          <button type="button" data-testid="btn-play-again">Jogar novamente</button>
        </Link>
      </div>
    );
  }
}

export default FeedbackMessages;
