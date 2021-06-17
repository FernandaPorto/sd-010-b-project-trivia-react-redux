import React from 'react';
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

    this.renderQuestion = this.renderQuestion.bind(this);

    this.state = {
      probabilityBase: 0.5,
    };
  }

  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
  }

  renderQuestion(questionIndex) {
    const { questions, isResolved, answerQuestion } = this.props;
    const { probabilityBase } = this.state;

    const {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions[questionIndex];

    const randomizer = (array) => array.sort(() => Math.random() - probabilityBase);

    const answers = randomizer([correctAnswer, ...incorrectAnswers]);

    const randomAnswers = answers.map((answer, index) => {
      const isCorrect = answer === correctAnswer;
      const coloredStyle = isCorrect ? 'green-border' : 'red-border';
      const testId = isCorrect ? 'correct-answer' : `wrong-answer-${index}`;

      return (
        <button
          type="button"
          key={ index }
          data-testid={ testId }
          onClick={ answerQuestion }
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
        {randomAnswers}
      </div>
    );
  }

  renderNextButton() {
    const { nextQuestion } = this.props;
    return (
      <button type="button" onClick={ nextQuestion } data-testid="btn-next">
        Próxima pergunta
      </button>
    );
  }

  render() {
    const { isLoading, questionIndex, isResolved } = this.props;
    return (
      <section>
        {isLoading ? <h3>LOADING...</h3> : this.renderQuestion(questionIndex)}
        {isResolved ? this.renderNextButton() : <Timer />}
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
