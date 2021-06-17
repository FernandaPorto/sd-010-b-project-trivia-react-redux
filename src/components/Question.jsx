import React from 'react';
import PropTypes from 'prop-types';

class Questions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAnswered: false,
    };

    this.changeBorder = this.changeBorder.bind(this);
    this.createAnswers = this.createAnswers.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
  }

  changeBorder() {
    this.setState((prevState) => ({
      isAnswered: !prevState.isAnswered,
    }));
  }

  createAnswers(quest, index) {
    const { isAnswered } = this.state;
    const { result: { correct_answer: correctAnswer } } = this.props;
    if (quest === correctAnswer) {
      return (
        <button
          key={ index }
          type="button"
          onClick={ this.changeBorder }
          data-testid="correct-answer"
          style={ isAnswered ? { border: '3px solid rgb(6, 240, 15)' } : null }
        >
          { quest }
        </button>
      );
    }
    return (
      <button
        key={ index }
        type="button"
        onClick={ this.changeBorder }
        data-testid={ `wrong-answer-${index}` }
        style={ isAnswered ? { border: '3px solid rgb(255, 0, 0)' } : null }
      >
        { quest }
      </button>
    );
  }

  handleNextButton() {
    const { handleNext } = this.props;

    this.changeBorder();
    handleNext();
  }

  render() {
    const { result: {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    },
    } = this.props;

    if (correctAnswer) {
      const allAnswers = [correctAnswer, ...incorrectAnswers];
      return (
        <section>
          <h2 data-testid="question-category">
            {category}
          </h2>
          <div data-testid="question-text">
            {question}
          </div>
          <div
            role="button"
            className="answers"
          >
            {allAnswers.map((quest,
              index) => (this.createAnswers(quest, index))) }
          </div>
          <button
            type="button"
            onClick={ this.handleNextButton }
          >
            Next
          </button>
        </section>
      );
    }
  }
}

Questions.propTypes = {
  result: PropTypes.shape({
    category: PropTypes.string,
  }),
  handleNextQuestion: PropTypes.func,
}.isRequired;

Questions.default = {
  result: undefined,
};

export default Questions;
