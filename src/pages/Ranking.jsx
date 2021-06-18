import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <section>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          {ranking.map((element, index) => (
            <li key={ index }>
              <img src={ element.picture } alt="player" />
              <span data-testid={ `player-name-${index}` }>{element.name}</span>
              <span data-testid={ `player-score-${index}` }>{element.score}</span>
            </li>
          ))}
          <button type="button" data-testid="btn-go-home">
            <Link to="/">Jogar novamente</Link>
          </button>
        </ul>
      </section>
    );
  }
}

export default Ranking;
