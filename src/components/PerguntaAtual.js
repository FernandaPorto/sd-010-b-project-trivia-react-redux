import React from 'react';
import PropTypes from 'prop-types';

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
  }

  paintAnswerIncorrect() {
    const branco = document.getElementsByClassName('incorrect');
    for (let key = 0; key < branco.length; key += 1) {
      branco[key].style.border = '3px solid rgb(255, 0, 0)';
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
        return (
          <button
            type="button"
            className="incorrect"
            onClick={ () => this.paintAll() }
            data-testid={ `wrong-answer-${index - 1}` }
            key={ i }
          >
            { answer }
          </button>
        );
      }
      return (
        <button
          key={ i }
          type="button"
          id="correct"
          onClick={ () => this.paintAll() }
          data-testid="correct-answer"
        >
          { answer }
        </button>
      );
    });
  }

  render() {
    const { randomAnswer: { allAnswers, category, question } } = this.props;
    return (
      <div className="questions-section">
        <h3 data-testid="question-category">{ category }</h3>
        <br />
        <div data-testid="question-text">{ question }</div>
        { !allAnswers ? <div>Carregando...</div> : this.renderAnswers() }
      </div>
    );
  }
}

PerguntaAtual.propTypes = {
  randomAnswer: PropTypes.shape({
    allAnswers: PropTypes.arrayOf(PropTypes.string),
    correctAnswer: PropTypes.string,
    category: PropTypes.string,
    question: PropTypes.string,
  }).isRequired,
  buttonAvaliable: PropTypes.func.isRequired,
};

export default PerguntaAtual;
