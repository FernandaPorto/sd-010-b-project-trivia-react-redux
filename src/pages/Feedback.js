import React, { Component } from 'react';

class Feedback extends Component {
  constructor() {
    super();

    this.state = {
      score: 100,
      name: 'Matheus Gabriel',
      finalScore: 500,
      questions: 10,
    };
  }

  render() {
    const { score, name, finalScore, questions } = this.state;
    // trazer os dados do localStorage, importar a função getPlayerDataLocalStorage() em helpers/localStorage.js
    return (
      <>
        <div data-testid="feedback-text">Parabéns ou não</div>
        {/* Trazer a imagem do player */}
        <img src="" data-testid="header-profile-picture" alt="" />
        {/* Trazer o nome do player */}
        <p>Nome</p>
        <h1 data-testid="header-player-name">{name}</h1>
        {/* Trazer o score do player */}
        <p>Score</p>
        <h2 data-testid="header-score">{score}</h2>

        <div>
          {/* Placar final */}
          <p>Score final</p>
          <p data-testid="feedback-total-score">{finalScore}</p>
          {/* Numero de perguntas que o player acertou */}
          <p>Questões acertadas</p>
          <p data-testid="feedback-total-question">
            {questions === 0
              ? 'Não acertou nenhuma pergunta'
              : `Acertou ${questions} perguntas`}
          </p>
        </div>
      </>
    );
  }
}

export default Feedback;
