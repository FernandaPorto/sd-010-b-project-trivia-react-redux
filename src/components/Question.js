import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { receiveToken, requestQuestions,
  toggleStatusCronometer, receiveScore } from '../actions';
import '../style/question.css';
import Cronometer from './Cronometer';
import { updateAssertionsAndScore } from '../helpers/localStorage';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      indexQuestion: 0,
    };
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

  async handleClick({ target: { id } }) {
    const { setStatusCronometer } = this.props;
    this.updateButtonsStyle();
    await setStatusCronometer('off');
    if (id === 'correct-answer') {
      const { indexQuestion } = this.state;
      const { seconds, updateScore, questions } = this.props;
      const { difficultyLevel } = questions[indexQuestion];
      updateAssertionsAndScore(difficultyLevel, seconds);
      updateScore();
    }
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
  setStatusCronometer: (status) => dispatch(toggleStatusCronometer(status)),
  updateScore: () => dispatch(receiveScore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);

Question.propTypes = {
  questions: propTypes.arrayOf(propTypes.object).isRequired,
  getQuestions: propTypes.func.isRequired,
  getToken: propTypes.func.isRequired,
  token: propTypes.string.isRequired,
  setStatusCronometer: propTypes.func.isRequired,
  seconds: propTypes.number.isRequired,
  updateScore: propTypes.func.isRequired,
};
