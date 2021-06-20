import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const rankList = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
        { rankList.map(({ name, score, picture }, i) => (
          <div key={ i }>
            <img
              src={ picture }
              alt="profile user"
            />
            <span data-testid={ `player-name-${i}` }>
              { name }
            </span>
            <span data-testid={ `player-score-${i}` }>
              { score }
            </span>
          </div>
        ))}
        <Link to="/">
          <button type="button" data-testid="btn-go-home">
            Jogar novamente
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
