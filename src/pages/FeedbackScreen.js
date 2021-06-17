import React, { Component } from 'react';
import { Redirect } from 'react-router';
import HeaderGame from '../components/HeaderGame';

class FeedbackScreen extends Component {
  constructor() {
    super();

    this.state = {
      score: '',
      assertions: '',
      message: '',
      goToHome: false,
      goToRanking: false,
    };
    this.fillStorage = this.fillStorage.bind(this);
    this.goHome = this.goHome.bind(this);
    this.goRanking = this.goRanking.bind(this);
  }

  componentDidMount() {
    this.fillStorage();
  }

  fillStorage() {
    const TRES = 3;
    let message = '';
    const storage = JSON.parse(localStorage.getItem('state'));

    if (storage.player.assertions < TRES) message = 'Podia ser melhor...';
    if (storage.player.assertions >= TRES) message = 'Mandou bem!';
    const { score, assertions } = storage.player;

    this.setState({ score, assertions, message });
  }

  goHome() { this.setState({ goToHome: true }); }

  goRanking() { this.setState({ goToRanking: true }); }

  render() {
    const { score, assertions, message, goToRanking, goToHome } = this.state;
    // console.log(storage.player.assertions);
    return (
      <section>
        { goToHome && <Redirect to="/" /> }
        { goToRanking && <Redirect to="/ranking" /> }

        <HeaderGame />
        <p data-testid="feedback-text">{ message }</p>
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <button
          onClick={ this.goHome }
          type="button"
          data-testid="btn-play-again"
        >
          Jogar novamente
        </button>
        <button
          onClick={ this.goRanking }
          type="button"
          data-testid="btn-ranking"
        >
          Ver Ranking
        </button>
      </section>
    );
  }
}

export default FeedbackScreen;
