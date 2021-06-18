import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    this.accessLocalStorage();
  }

  accessLocalStorage() {
    const players = JSON.parse(localStorage.getItem('ranking'));
    this.setState({
      ranking: players,
    });
  }

  renderPlayers() {
    const { ranking } = this.state;
    return (
      ranking.sort((a, b) => b.score - a.score).map((player, key) => (
        <div key={ key }>
          <p data-testid={ `player-name-${key}` }>{ player.name }</p>
          <p data-testid={ `player-score-${key}` }>{ player.score }</p>
          <img src={ player.picture } alt="player frame" />
        </div>
      ))
    );
  }

  render() {
    return (
      <div>
        <section>
          <h1 data-testid="ranking-title">RANKING</h1>
          { this.renderPlayers() }
        </section>
        <Link to="/" data-testid="btn-go-home">Tente Novamente</Link>
      </div>
    );
  }
}
