import React from 'react';
import PropTypes from 'prop-types';

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
        return (
          <button
            type="button"
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
        <div data-testid="question-category">{ category }</div>
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
};

export default PerguntaAtual;
