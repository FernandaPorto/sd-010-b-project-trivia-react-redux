import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Ranking extends Component {
  render() {
    let getRanking = JSON.parse(localStorage.getItem('ranking'));
    if (getRanking === null) {
      getRanking = [];
    }

    return (
      <section>
        <Header />
        <h1 data-testid="ranking-title">RANKING</h1>
        {getRanking.map((item, i) => (
          <h3
            key={ i }
            data-testid={ `player-name-${i}` }
          >
            {`${item.name} - ${item.score} pontos`}
          </h3>))}

        <Link to="/">
          <button data-testid="btn-go-home" type="button">Voltar</button>
        </Link>
      </section>
    );
  }
}

export default Ranking;
