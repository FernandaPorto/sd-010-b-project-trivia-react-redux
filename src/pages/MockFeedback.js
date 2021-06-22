import React, { Component } from 'react';

class MockFeedback extends Component {
  constructor () {
    super()

    this.state = {
      score: 100,
      name: 'Matheus Gabriel',
      finalScore: 500,
      questions: 10
    }
  }
  
  render(){
    const { score, name, finalScore, questions } = this.state

    return(
      <>
        <div data-testid="feedback-text">Parabéns ou não</div>
        {/* Trazer a imagem do player */}
        <img src="" data-testid="header-profile-picture" alt="" />
        {/* Trazer o nome do player */}
        <label htmlFor="">Nome</label>
        <h1 data-testid="header-player-name">{name}</h1>
        {/* Trazer o score do player */}
        <label htmlFor="">Score</label>
        <h2 data-testid="header-score">{score}</h2>

        <div>
          {/* Placar final */}
          <label htmlFor="">Score final</label>
          <p data-testid="feedback-total-score">{finalScore}</p>
          {/* Numero de perguntas que o player acertou */}
          <label htmlFor="">Questões acertadas</label>
          <p data-testid="feedback-total-question">
            {questions === 0 ? 'Não acertou nenhuma pergunta' : `Acertou ${questions} perguntas`}
          </p>
        </div>
      </>
    )
  }
  }
  
  export default MockFeedback;
