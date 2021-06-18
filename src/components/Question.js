import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {
  receiveToken, requestQuestions,
  increaseScore, toggleStatusCronometer } from '../actions';
import '../style/question.css';

const CORRECT_ANSWER = 'correct-answer';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      indexQuestion: 0,
    };
    this.generateRandomAnswers = this.generateRandomAnswers.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.updateButtonsStyle = this.updateButtonsStyle.bind(this);
  }

  componentDidMount() {
    const { getQuestions, getToken, token } = this.props;
    getToken();
    getQuestions(token);
  }

  updateButtonsStyle() {
    const correctButton = document.querySelector('button[data-testid="correct-answer"]');
    const wrongButton = document.querySelectorAll('button[data-testid*="wrong-answer"]');
    correctButton.classList.add('correct');
    correctButton.disabled = true;
    wrongButton.forEach((button) => {
      button.classList.add('incorrect');
      button.disabled = true;
    });
  }

  handleClick({ target: { id } }) {
    const { setStatusCronometer, seconds, setScore, questions } = this.props;
    const TEN = 10;
    const { index } = this.state;
    const { difficulty } = questions[index];
    const difficultyScore = { hard: 3, medium: 2, easy: 1 };
    this.insertClass();
    setStatusCronometer('off');
   /*  if (id === CORRECT_ANSWER) {
      const score = TEN + (difficultyScore[difficulty] * seconds);
      setScore(score);
    } */
  }

  render() {
    const { questions } = this.props;
    const { indexQuestion } = this.state;

    if (questions.length) {
      const { category, question, answers } = questions[indexQuestion];
      return (
        <section>
          <div data-testid="question-category">{ category }</div>
          <div data-testid="question-text">{ question }</div>
          <div>
            {answers.map(({ answer, dataTestId }, index) => (
              <button
                onClick={ this.handleClick }
                type="button"
                data-testid={ `${dataTestId}` }
                key={ index }
                id={ `${dataTestId}` }
              >
                {answer}
              </button>
            ))}
          </div>
          <Cronometer />
        </section>
      );
    }
    return <section>carregando...</section>;
  }
}

const mapStateToProps = (state) => ({
  questions: state.trivia.questions,
  token: state.trivia.token,
  seconds: state.trivia.seconds,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(requestQuestions(token)),
  getToken: () => dispatch(receiveToken()),
  setScore: (score) => dispatch(increaseScore(score)),
  setStatusCronometer: (status) => dispatch(toggleStatusCronometer(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);

Question.propTypes = {
  questions: propTypes.arrayOf(propTypes.object).isRequired,
  getQuestions: propTypes.func.isRequired,
  getToken: propTypes.func.isRequired,
  token: propTypes.string.isRequired,
  setScore: propTypes.func.isRequired,
  setStatusCronometer: propTypes.func.isRequired,
  seconds: propTypes.number.isRequired,
};
