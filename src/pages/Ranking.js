import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getRanking } from '../services/token';

export default class Ranking extends Component {
  render() {
    const array = getRanking();
    const ranking = array.sort((a, b) => b.score - a.score);
    console.log(ranking);
    return (
      <div>
        <p data-testid="ranking-title">Ranking</p>
        {
          ranking.map((item, index) => (
            <div key={ index }>
              <img src={ item.picture } alt={ item.name } />
              <p data-testid={ `player-name-${index}` }>{item.name}</p>
              <p data-testid={ `player-score-${index}` }>{item.score}</p>
            </div>
          ))
        }
        <Link
          data-testid="btn-go-home"
          to="/"
        >
          Home
        </Link>
      </div>
    );
  }
}
