import React from 'react';
import PropTypes from 'prop-types';

class Questions extends React.Component {
  constructor(props) {
    super(props);

    this.colorAnswer = this.colorAnswer.bind(this);
    this.createAnswers = this.createAnswers.bind(this);
  }

  colorAnswer() {
    const correct = document.querySelector('.correct');
    const wrong = document.querySelectorAll('.wrong');

    correct.style.border = '3px solid rgb(6, 240, 15)';
    wrong.forEach((answer) => {
      answer.style.border = '3px solid rgb(255, 0, 0)';
    });
  }

  createAnswers(quest, index, correctAnswer, disabled) {
    if (quest === correctAnswer) {
      return (
        <button
          key={ index }
          type="button"
          onClick={ this.colorAnswer }
          data-testid="correct-answer"
          className="correct"
          disabled={ disabled }
        >
          { quest }
        </button>
      );
    }
    if (disabled) {
      this.colorAnswer();
    }
    return (
      <button
        key={ index }
        type="button"
        onClick={ this.colorAnswer }
        data-testid={ `wrong-answer-${index}` }
        className="wrong"
        disabled={ disabled }
      >
        { quest }
      </button>
    );
  }

  render() {
    const { result:
       { category,
         question,
         correct_answer: correctAnswer,
         incorrect_answers: incorrectAnswers,
       },
    disabled,
    } = this.props;

    if (correctAnswer) {
      const allQuestions = [correctAnswer, ...incorrectAnswers];
      return (
        <>
          <h2 data-testid="question-category">
            {category}
          </h2>
          <div data-testid="question-text">
            {question}
          </div>
          <section
            role="link"
            className="answers"
          >
            {allQuestions.map((quest,
              index) => (this.createAnswers(quest, index, correctAnswer, disabled))) }
          </section>
        </>
      );
    }
  }
}

Questions.propTypes = {
  result: PropTypes.shape({
    category: PropTypes.string,
  }),
  disabled: PropTypes.bool,
}.isRequired;

Questions.default = {
  result: undefined,
};

export default Questions;
