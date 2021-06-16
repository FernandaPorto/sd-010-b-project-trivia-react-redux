import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { receiveToken, requestQuestions } from '../actions';
import '../style/question.css';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
    };
    this.generateRandomAnswers = this.generateRandomAnswers.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { getQuestions, getToken, token } = this.props;
    getToken();
    getQuestions(token);
  }

  generateRandomAnswers(correctAnswer, incorrectAnswer) {
    const range = 20;
    const getRandom = () => Math.ceil(Math.random() * range);
    if (incorrectAnswer.length < 2) {
      return [
        { id: getRandom(), answer: correctAnswer, dataTestId: 'correct-answer' },
        { id: getRandom(), answer: incorrectAnswer, dataTestId: 'wrong-answer-0' },
      ].sort((a, b) => +(a.id > b.id) || +(a.id === b.id) - 1); // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    }
    return [
      { id: getRandom(), answer: correctAnswer, dataTestId: 'correct-answer' },
      { id: getRandom(), answer: incorrectAnswer[0], dataTestId: 'wrong-answer-0' },
      { id: getRandom(), answer: incorrectAnswer[1], dataTestId: 'wrong-answer-1' },
      { id: getRandom(), answer: incorrectAnswer[2], dataTestId: 'wrong-answer-2' },
    ].sort((a, b) => +(a.id > b.id) || +(a.id === b.id) - 1); // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  }

  handleClick() {
    const correctButton = document.querySelector('button[data-testid="correct-answer"]');
    const wrongButton = document.querySelectorAll('button[data-testid*="wrong-answer"]');
    correctButton.classList.add('correct');
    wrongButton.forEach((button) => button.classList.add('incorrect'));
  }

  render() {
    const { questions } = this.props;
    const { index } = this.state;

    if (questions.length) {
      const {
        category,
        question,
        correct_answer: correct,
        incorrect_answers: incorrects } = questions[index];
      const randonAnswers = this.generateRandomAnswers(correct, incorrects);
      return (
        <section>
          <div data-testid="question-category">{ category }</div>
          <div data-testid="question-text">{ question }</div>
          <div>
            {randonAnswers.map(({ id, answer, dataTestId }) => (
              <button
                onClick={ this.handleClick }
                type="button"
                data-testid={ `${dataTestId}` }
                key={ id }
              >
                {answer}
              </button>
            ))}
          </div>
        </section>
      );
    }
    return <section>carregando...</section>;
  }
}

const mapStateToProps = (state) => ({
  questions: state.trivia.questions,
  token: state.trivia.token,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(requestQuestions(token)),
  getToken: () => dispatch(receiveToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);

Question.propTypes = {
  questions: propTypes.arrayOf(propTypes.object).isRequired,
  getQuestions: propTypes.func.isRequired,
  getToken: propTypes.func.isRequired,
  token: propTypes.string.isRequired,
};
