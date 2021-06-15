import React from 'react';

class PerguntaAtual extends React.Component {
  render() {
    const { randomAnswer: { allAnswers, category, question, correctAnswer } } = this.props;
    console.log(allAnswers);
    return (
      <div>
        <div data-testid="question-category">{ category }</div>
        <br />
        <div data-testid="question-text">{ question }</div>
        { !allAnswers ? <div>Carregando...</div> : allAnswers.map((answer, index) => (answer === correctAnswer ? <button type="button" data-testid="correct-answer">{answer}</button> : <button type="button" data-testid={ `wrong-answer-${index}` }>{answer}</button>))}
      </div>
    );
  }
}

export default PerguntaAtual;
