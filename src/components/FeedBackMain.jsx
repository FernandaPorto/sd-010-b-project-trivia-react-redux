import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';

class FeedBackMain extends Component {
  constructor(props) {
    super(props);
    this.renderFeedback = this.renderFeedback.bind(this);
  }

  componentDidMount() {
    const playerInfo = JSON.parse(localStorage.getItem('state'));
    const oldPlayers = JSON.parse(localStorage.getItem('ranking'));
    if (oldPlayers === null) {
      const newPlayer = [{
        name: playerInfo.player.name,
        score: playerInfo.player.score,
        picture: `https://www.gravatar.com/avatar/${this.userEmail()}`,
      }];
      return localStorage.setItem('ranking', JSON.stringify(newPlayer));
    }
    const newPlayer = {
      name: playerInfo.player.name,
      score: playerInfo.player.score,
      picture: `https://www.gravatar.com/avatar/${this.userEmail()}`,
    };
    oldPlayers.push(newPlayer);
    localStorage.setItem('ranking', JSON.stringify(oldPlayers));
  }

  userEmail() {
    const player = localStorage.getItem('state');
    const newPlayer = JSON.parse(player);
    const userEmail = md5(newPlayer.player.gravatarEmail).toString();
    return userEmail;
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
          <span data-testid="feedback-total-question">
            {' '}
            {assertions}
            {' '}
          </span>
          e fez
          <span data-testid="feedback-total-score">
            {' '}
            {score}
            {' '}
          </span>
          pontos!
        </p>
        <Link to="/" data-testid="btn-play-again">
          <button className="btn" type="button">
            Jogar Novamente
          </button>
        </Link>
        <Link to="/ranking" data-testid="btn-ranking">
          <button className="btn" type="button">
            Ver Ranking
          </button>
        </Link>

      </section>
    );
  }

  render() {
    return (
      <main className="main-feedback">
        {this.renderFeedback()}
        {this.renderFinal()}
      </main>
    );
  }
}

export default FeedBackMain;
