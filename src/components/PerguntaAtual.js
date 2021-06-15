import React from 'react';

class PerguntaAtual extends React.Component {
  constructor() {
    super();
    this.renderAnswers = this.renderAnswers.bind(this);
  }

  renderAnswers() {
    const { randomAnswer: { allAnswers, correctAnswer } } = this.props;
    let index = 0;
    return allAnswers.map((answer, i) => {
      if (answer !== correctAnswer) {
        index += 1;
        return (<button type="button" data-testid={ `wrong-answer-${index - 1}` } key={index + 10 } >{ answer }</button>);
      }
      return (<button key={ i } type="button" data-testid="correct-answer">{ answer }</button>);
    });
  }

  render() {
    const { randomAnswer: { allAnswers, category, question} } = this.props;
    return (
      <div>
        <div data-testid="question-category">{ category }</div>
        <br />
        <div data-testid="question-text">{ question }</div>
        { !allAnswers ? <div>Carregando...</div> : this.renderAnswers() }
        {/* { !allAnswers ? <div>Carregando...</div> : allAnswers.map((answer, index) => (answer === correctAnswer ? <button type="button" data-testid="correct-answer">{answer}</button> : <button type="button" data-testid={ `wrong-answer-${index}` }>{answer}</button>))} */}
      </div>
    );
  }
}

export default PerguntaAtual;
