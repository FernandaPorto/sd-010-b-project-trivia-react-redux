import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getQuestionsThunk,
  answerQuestionActionCreator,
  nextQuestionActionCreator,
  updateSecondsActionCreator,
} from '../redux/actions';

import Timer from './Timer';

class TriviaGame extends React.Component {
  constructor(props) {
    super(props);

    this.handleScore = this.handleScore.bind(this);
    this.renderQuestion = this.renderQuestion.bind(this);
    this.renderNextButton = this.renderNextButton.bind(this);
  }

  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
  }

  handleScore() {
    const { questions, questionIndex, secondsLeft } = this.props;

    const correctAnswerPoints = 10;
    const difficultyPoints = {
      easy: 1,
      medium: 2,
      hard: 3,
    };

    const state = JSON.parse(localStorage.getItem('state'));
    const { difficulty } = questions[questionIndex];
    const level = difficultyPoints[difficulty];

    const calculator = () => (
      state.player.score
      + correctAnswerPoints
      + (secondsLeft * level));

    state.player.assertions += 1;
    state.player.score = calculator();

    localStorage.setItem('state', JSON.stringify(state));
  }

  renderNextButton() {
    const { history, questions, questionIndex, nextQuestion } = this.props;
    const isLast = questionIndex === questions.length - 1;
    const teste = () => history.push('/feedback');
    return (
      <button
        type="button"
        onClick={ () => { nextQuestion(); if (isLast) teste(); } }
        data-testid="btn-next"
      >
        Próxima pergunta
      </button>
    );
  }

  renderQuestion() {
    const { questions, questionIndex, isResolved, answerQuestion } = this.props;

    const {
      category,
      question,
      answerOptions,
      correctAnswer,
    } = questions[questionIndex];

    const renderAnswers = answerOptions.map((answer, index) => {
      const isCorrect = answer === correctAnswer;
      const coloredStyle = isCorrect ? 'green-border' : 'red-border';
      const testId = isCorrect ? 'correct-answer' : `wrong-answer-${index}`;

      return (
        <button
          type="button"
          key={ index }
          data-testid={ testId }
          onClick={ () => { answerQuestion(); if (isCorrect) this.handleScore(); } }
          className={ isResolved ? coloredStyle : 'default-button' }
          disabled={ isResolved }
        >
          {answer}
        </button>
      );
    });

    return (
      <div>
        <h2 data-testid="question-category">{category}</h2>
        <h3 data-testid="question-text">{question}</h3>
        {renderAnswers}
        <div>
          {isResolved ? this.renderNextButton() : <Timer />}
        </div>
      </div>
    );
  }

  render() {
    const { isLoading } = this.props;
    return (
      <section>
        {isLoading ? <h3>LOADING...</h3> : this.renderQuestion()}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.game.isLoading,
  questions: state.game.questions,
  questionIndex: state.game.questionIndex,
  isResolved: state.game.isResolved,
  secondsLeft: state.game.secondsLeft,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(getQuestionsThunk()),
  answerQuestion: () => dispatch(answerQuestionActionCreator()),
  nextQuestion: () => dispatch(nextQuestionActionCreator()),
  updateSeconds: (payload) => dispatch(updateSecondsActionCreator(payload)),
});

TriviaGame.propTypes = {
  secondsLeft: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(TriviaGame);
