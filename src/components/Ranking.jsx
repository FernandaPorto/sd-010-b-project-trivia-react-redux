import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Ranking extends Component {
  render() {
    const getRanking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <section>
        <h1 data-testid="ranking-title"> Ranking </h1>
        {getRanking.map(((user) => (
          <section key={ user.index }>
            <span>
              Usuário:
              {' '}
              {user.name}
            </span>
            <br />
            <span>
              Score:
              {' '}
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
          <button data-testid="btn-go-home" type="button">
            Voltar para Home
          </button>
        </Link>
      </section>
    );
  }
}
