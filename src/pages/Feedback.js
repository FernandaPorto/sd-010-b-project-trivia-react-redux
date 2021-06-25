import React, { Component } from 'react';
import { getPlayerDataLocalStorage } from '../helpers/localStorage';

const THREE = 3;

class Feedback extends Component {
  render() {
    // const { score, finalScore, questions } = this.props;
    const name = getPlayerDataLocalStorage('name');
    const score = getPlayerDataLocalStorage('score');
    const assertions = getPlayerDataLocalStorage('assertions');
    // trazer os dados do localStorage, importar a função getPlayerDataLocalStorage() em helpers/localStorage.js
    return (
      <>
        <header>
          <img src="https://www.gravatar.com/avatar/" data-testid="header-profile-picture" alt="Gravatar" />
          <p>Nome</p>
          <h1 data-testid="header-player-name">{name}</h1>
          <p>Score</p>
          <h2 data-testid="header-score">{score}</h2>
        </header>
        <div>
          <div data-testid="feedback-text">
            { ((assertions < THREE) ? 'Podia ser melhor...' : 'Mandou bem!') }
          </div>
          <h3 data-testid="feedback-total-question">{ assertions}</h3>
          <h3 data-testid="feedback-total-score">{ score }</h3>
        </div>
      </>
    );
  }
}

export default Feedback;
