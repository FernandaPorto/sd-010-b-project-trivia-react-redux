import React from 'react';

class PerguntaAtual extends React.Component {
  constructor() {
    super();
    this.renderAnswers = this.renderAnswers.bind(this);
    this.paintAnswerCorrect = this.paintAnswerCorrect.bind(this);
    this.paintAnswerIncorrect = this.paintAnswerIncorrect.bind(this);
    this.paintAll = this.paintAll.bind(this);
  }

  paintAnswerCorrect() {
    const correct = document.getElementById('correct');
    correct.style.border = '3px solid rgb(6, 240, 15)';
    correct.style.boxShadow = '0px 0px 30px green';
  }

  paintAnswerIncorrect() {
    const branco = document.getElementsByClassName('incorrect');
    for (let key = 0; key < branco.length; key += 1) {
      branco[key].style.border = '3px solid rgb(255, 0, 0)';
      branco[key].style.boxShadow = '0px 0px 30px green';
    }
  }

  paintAll() {
    const { buttonAvaliable } = this.props;
    this.paintAnswerIncorrect();
    this.paintAnswerCorrect();
    buttonAvaliable();
  }

  renderAnswers() {
    const { randomAnswer: { allAnswers, correctAnswer } } = this.props;
    let index = 0;
    return allAnswers.map((answer, i) => {
      if (answer !== correctAnswer) {
        index += 1;
        return (<button type="button" className="incorrect" onClick={ () => this.paintAll() } data-testid={ `wrong-answer-${index - 1}` } key={ index + 10 }>{ answer }</button>);
      }
      return (<button key={ i } type="button" id="correct" onClick={ () => this.paintAll() } data-testid="correct-answer">{ answer }</button>);
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
