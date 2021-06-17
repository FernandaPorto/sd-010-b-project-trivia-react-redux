import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    let getRanking = JSON.parse(localStorage.getItem('ranking'));
    const atual = JSON.parse(localStorage.getItem('state'));
    if (getRanking === null) {
      getRanking = [];
    }

    return (
      <section>
        <h1 data-testid="ranking-title">RANKING</h1>
        {getRanking.map((item, i) => (
          <div key={ i }>
            <img
              data-testid=""
              height="20"
              src={ `https://www.gravatar.com/avatar/${item.emailGravatar}` }
              alt="Avatar"
            />
            <h3
              data-testid={ `player-name-${i + 1}` }
            >
              {item.name}
            </h3>
            <h3 data-testid={ `player-score-${i + 1}` }>
              {item.score}
            </h3>
          </div>
        ))}
                <img
          data-testid=""
          height="20"
          src={ `https://www.gravatar.com/avatar/${atual.player.emailGravatar}` }
          alt="Avatar"
        />
        <h3
          data-testid="player-name-1"
        >
          {`${atual.player.name}`}
          {' '}

        </h3>
        <h3 data-testid="player-score-1">{`com ${atual.player.score} pontos`}</h3>

        <Link to="/">
          <button data-testid="btn-go-home" type="button">Voltar</button>
        </Link>
      </section>
    );
  }
}

export default Ranking;
