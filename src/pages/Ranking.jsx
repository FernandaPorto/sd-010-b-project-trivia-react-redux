import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const getRanking = JSON.parse(localStorage.getItem('ranking'));
    // const atual = JSON.parse(localStorage.getItem('state'));
    return (
      <section className="question-card">
        <h1 data-testid="ranking-title">RANKING</h1>
        {getRanking.map((item, i) => (
          <div key={ i } className="ranking-item">
            <img
              height="20"
              src={ `https://www.gravatar.com/avatar/${item.emailGravatar}` }
              alt="Avatar"
            />
            <h3>Name :</h3>
            <h3 data-testid={ `player-name-${i}` }>
              {item.name}
            </h3>
            <h3>Pontos:</h3>
            <h3 data-testid={ `player-score-${i}` }>
              {item.score}
            </h3>
          </div>
        ))}
        <Link to="/">
          <button
            className="login-button"
            data-testid="btn-go-home"
            type="button"
          >
            Voltar
          </button>
        </Link>
      </section>
    );
  }
}

export default Ranking;
