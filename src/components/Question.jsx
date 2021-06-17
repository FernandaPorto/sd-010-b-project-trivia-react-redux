import React from 'react';
import PropTypes from 'prop-types';

class Questions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAnswered: false,
    };

    this.changeBorder = this.changeBorder.bind(this);
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.createAnswers = this.createAnswers.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
  }

  changeBorder() {
    this.setState((prevState) => ({
      isAnswered: !prevState.isAnswered,
    }));
  }

  handleAnswerClick() {
    const { stopTimer } = this.props;

    this.changeBorder();
    stopTimer();
  }

  createAnswers(quest, index) {
    const { isAnswered } = this.state;
    const { result: { correct_answer: correctAnswer }, answerDisabled } = this.props;
    if (quest === correctAnswer) {
      return (
        <button
          key={ index }
          type="button"
          onClick={ this.handleAnswerClick }
          data-testid="correct-answer"
          style={ isAnswered || answerDisabled
            ? { border: '3px solid rgb(6, 240, 15)' } : null }
          disabled={ answerDisabled }
        >
          { quest }
        </button>
      );
    }
    return (
      <button
        key={ index }
        type="button"
        onClick={ this.handleAnswerClick }
        data-testid={ `wrong-answer-${index}` }
        style={ isAnswered || answerDisabled
          ? { border: '3px solid rgb(255, 0, 0)' } : null }
        disabled={ answerDisabled }
      >
        { quest }
      </button>
    );
  }

  handleNextButton() {
    const { handleNext } = this.props;
    this.setState({
      isAnswered: false,
    });
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
