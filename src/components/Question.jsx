import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { increaseScore } from '../actions';

class Questions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAnswered: false,
      nextBtnState: false,
    };

    this.changeBorder = this.changeBorder.bind(this);
    this.handleRightAnswerClick = this.handleRightAnswerClick.bind(this);
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.createAnswers = this.createAnswers.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.calculatePoints = this.calculatePoints.bind(this);
    this.changeNextBtnState = this.changeNextBtnState.bind(this);
  }

  changeBorder() {
    this.setState((prevState) => ({
      isAnswered: !prevState.isAnswered,
    }));
  }

  changeNextBtnState() {
    this.setState((prevState) => ({
      nextBtnState: !prevState.nextBtnState,
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
    const state = {
      player: {
        name,
        gravatarEmail,
        assertions: assertions + 1,
        score: score + scoreToSum,
      },
    };
    localStorage.setItem('state', JSON.stringify(state));
  }

  handleRightAnswerClick() {
    const { updateScore } = this.props;

    const score = this.calculatePoints();
    this.scoreToLocalStorage(score);
    updateScore(score);
    this.handleAnswerClick();
  }

  handleAnswerClick() {
    const { stopTimer } = this.props;

    this.changeBorder();
    stopTimer();
    this.changeNextBtnState();
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
      nextBtnState: false,
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
    time,
    } = this.props;
    const { nextBtnState } = this.state;

    const nextButton = (
      <button
        type="button"
        onClick={ this.handleNextButton }
        data-testid="btn-next"
      >
        Next
      </button>);

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
          { nextBtnState || time === 0
            ? nextButton : null }
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
