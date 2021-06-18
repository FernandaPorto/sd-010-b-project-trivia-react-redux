import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//
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
    this.finishGame = this.finishGame.bind(this);

    this.state = {
      redirect: false,
    };
  }

  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
  }

  handleScore() {
    const { questions, questionIndex, secondsLeft } = this.props;

    const TEN = 10;
    const difficultyPoints = {
      easy: 1,
      medium: 2,
      hard: 3,
    };

    const state = JSON.parse(localStorage.getItem('state'));
    const { difficulty } = questions[questionIndex];
    const level = difficultyPoints[difficulty];

    const calculator = () => state.player.score + TEN + secondsLeft * level;

    state.player.assertions += 1;
    state.player.score = calculator();

    localStorage.setItem('state', JSON.stringify(state));
  }

  finishGame() {
    const { name, picture } = this.props;

    const state = JSON.parse(localStorage.getItem('state'));
    const { player: { score } } = state;
    const newRanking = {
      name,
      score,
      picture,
    };
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    ranking.push(newRanking);

    ranking.sort((a, b) => b.score - a.score);

    localStorage.setItem('ranking', JSON.stringify(ranking));
    this.setState({ redirect: true });
  }

  renderNextButton() {
    const { questions, questionIndex, nextQuestion } = this.props;
    const isLast = questionIndex === questions.length - 1;
    return (
      <button
        type="button"
        onClick={ () => {
          nextQuestion();
          if (isLast) this.finishGame();
        } }
        data-testid="btn-next"
      >
        Próxima pergunta
      </button>
    );
  }

  renderQuestion() {
    const { questions, questionIndex, isResolved, answerQuestion } = this.props;
    const { category, question, answerOptions, correctAnswer } = questions[questionIndex];

    const renderAnswers = answerOptions.map((answer, index) => {
      const isCorrect = answer === correctAnswer;
      const coloredStyle = isCorrect ? 'green-border' : 'red-border';
      const testId = isCorrect ? 'correct-answer' : `wrong-answer-${index}`;

      return (
        <button
          type="button"
          key={ index }
          data-testid={ testId }
          onClick={ () => {
            answerQuestion();
            if (isCorrect) this.handleScore();
          } }
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
        <div>{isResolved ? this.renderNextButton() : <Timer />}</div>
      </div>
    );
  }

  render() {
    const { redirect } = this.state;
    const { isLoading } = this.props;

    if (redirect) return <Redirect to="/feedback" />;

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
  name: state.player.name,
  picture: state.player.gravatarURL,
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
