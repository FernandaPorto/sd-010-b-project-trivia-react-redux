import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Ranking extends Component {
  render() {
    const getRanking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <main className="main-ranking">
        <h1 data-testid="ranking-title"> Ranking </h1>

        {getRanking.sort((a, b) => {
          if (a.score > b.score) {
            const DECRESCENTE = -1;
            return DECRESCENTE;
          }
          if (a.score < b.score) {
            return 1;
          }
          // a must be equal to b
          return 0;
        }).map(((user) => (
          <section className="rank" key={ user.index }>
            <span>Usuário:</span>
            {' '}
            <span data-testid={ `player-name-${user.index}` }>
              {user.name}
            </span>
            <br />
            <span>Score:</span>
            {' '}
            <span data-testid={ `player-score-${user.index}` }>
              {user.score}
            </span>
            <br />
            <span>
              <img src={ user.picture } alt="user-img" />
            </span>
            <hr />
          </section>
        )
        ))}

        <Link to="/">
          <button className="btn" data-testid="btn-go-home" type="button">
            Voltar para Home
          </button>
        </Link>
      </main>
    );
  }
}
