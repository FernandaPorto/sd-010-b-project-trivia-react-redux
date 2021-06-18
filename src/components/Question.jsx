import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { increaseScore } from '../actions';

class Questions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAnswered: false,
    };

    this.changeBorder = this.changeBorder.bind(this);
    this.handleRightAnswerClick = this.handleRightAnswerClick.bind(this);
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.createAnswers = this.createAnswers.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.calculatePoints = this.calculatePoints.bind(this);
  }

  changeBorder() {
    this.setState((prevState) => ({
      isAnswered: !prevState.isAnswered,
    }));
  }

  calculatePoints() {
    const { time, result: { difficulty } } = this.props;
    const TEN_POINTS = 10;

    const pointsByDifficulty = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    return (TEN_POINTS + (time * pointsByDifficulty[difficulty]));
  }

  scoreToLocalStorage(scoreToSum) {
    const { name, gravatarEmail, score, assertions } = this.props;
    const ahvaitomanucutraibe = {
      player: {
        name,
        gravatarEmail,
        assertions: assertions + 1,
        score: score + scoreToSum,
      },
    };
    localStorage.setItem('state', JSON.stringify(ahvaitomanucutraibe));
  }

  handleRightAnswerClick() {
    const { updateScore } = this.props;

    this.handleAnswerClick();
    const score = this.calculatePoints();
    this.scoreToLocalStorage(score);
    updateScore(score);
  }

  handleAnswerClick() {
    const { stopTimer } = this.props;

    this.changeBorder();
    stopTimer();
  }

  createAnswers(currentQuestion, index) {
    const { isAnswered } = this.state;
    const { result: { correct_answer: correctAnswer }, answerDisabled } = this.props;
    if (currentQuestion === correctAnswer) {
      return (
        <button
          key={ index }
          type="button"
          onClick={ this.handleRightAnswerClick }
          data-testid="correct-answer"
          style={ isAnswered || answerDisabled
            ? { border: '3px solid rgb(6, 240, 15)' } : null }
          disabled={ answerDisabled }
        >
          { currentQuestion }
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
        { currentQuestion }
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
            {allAnswers.map((currentQuestion,
              index) => (this.createAnswers(currentQuestion, index))) }
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

const mapStateToProps = (state) => {
  const { player: { name, gravatarEmail, score, assertions } } = state;
  return {
    score,
    name,
    gravatarEmail,
    assertions,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateScore: (score) => dispatch(increaseScore(score)),
});

Questions.propTypes = {
  result: PropTypes.shape({
    category: PropTypes.string,
  }),
  handleNextQuestion: PropTypes.func,
  score: PropTypes.number,
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
  assertions: PropTypes.number,
}.isRequired;

Questions.default = {
  result: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
