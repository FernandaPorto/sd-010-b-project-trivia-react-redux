import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    ranking.sort((a, b) => b.score - a.score);

    return (
      <main>
        <h1>Ranking</h1>
        <ul>
          {ranking.map((element, index) => (
            <li key={ index }>
              <img src={ element.gravatarURL } alt="player" />
              <span>{element.name}</span>
              <span>{element.score}</span>
            </li>
          ))}
          <button type="button">
            <Link to="/">Jogar novamente</Link>
          </button>
        </ul>
      </main>
    );
  }
}

export default Ranking;
