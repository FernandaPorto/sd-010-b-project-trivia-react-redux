import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Ranking extends Component {
  render() {
    const rankingPlayer = JSON.parse(localStorage.getItem('ranking')).sort(
      (a, b) => b.score - a.score,
    );
    return (
      <header data-testid="ranking-title">
        Ranking

        <ul>
          {rankingPlayer.map((player, index) => (
            <li key={ index }>
              {' '}
              <span data-testid={ `player-name-${index}` }>{player.name}</span>
              {' '}
              <span data-testid={ `player-score-${index}` }>{player.score}</span>
              <img src={ `https://www.gravatar.com/avatar/${player.picture}` } width="50px" alt="profile" />
            </li>))}
        </ul>
        <Link to="/">
          <button
            data-testid="btn-go-home"
            type="button"
          >
            Jogar novamente
          </button>
        </Link>
      </header>
    );
  }
}
