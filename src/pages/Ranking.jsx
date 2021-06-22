import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));

    return (
      <div>
        <p data-testid="ranking-title">Ranking</p>
        <div>
          {
            ranking.map((player, index) => (
              <section key={ `${player.name}-${index}` }>
                <img src={ player.picture } alt={ player.name } />
                <span data-testid={ `player-name-${index}` }>{`${player.name}`}</span>
                <span data-testid={ `player-score-${index}` }>{player.score}</span>
              </section>))
          }
        </div>
        <Link to="/">
          <button
            data-testid="btn-go-home"
            type="button"
          >
            Início
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
