import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      home: false,
    };
  }

  render() {
    const { home } = this.state;
    if (home) return <Redirect to="/" />;
    const ranking = JSON.parse(localStorage.ranking);
    const rankingSorted = ranking .sort((a, b) => b.score - a.score);
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {
          rankingSorted.map(({ name, score, picture }, index) => (
            <div key={ index }>
              <img src={ picture } alt={ name } />
              <p data-testid={ `player-name-${index}` }>{name}</p>
              <p data-testid={ `player-score-${index}` }>{score}</p>
            </div>
          ))
        }
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => this.setState({ home: true }) }
        >
          Home
        </button>
      </div>
    );
  }
}

export default Ranking;
