import './TriviaGame.css';

import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';

import {
  getQuestionsThunk,
  answerQuestionActionCreator,
  nextQuestionActionCreator,
  updateSecondsActionCreator,
  updateScoreActionCreator,
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
    const { score, questions, questionIndex, secondsLeft, updateScore } = this.props;
    const TEN = 10;
    const difficultyPoints = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    const { difficulty } = questions[questionIndex];
    const level = difficultyPoints[difficulty];
    const newScore = score + TEN + secondsLeft * level;

    updateScore({ newScore });
  }

  finishGame() {
    const { name, gravatarURL, score } = this.props;

    const newRanking = {
      name,
      score,
      gravatarURL,
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

    let nextIndex = questionIndex + 1;
    if (isLast) nextIndex = 0;

    return (
      <button
        type="button"
        onClick={ () => {
          nextQuestion({ nextIndex });
          if (isLast) this.finishGame();
        } }
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

      return (
        <button
          type="button"
          key={ index }
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
        <h2>{category}</h2>
        <h3>{question}</h3>
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
  name: state.player.name,
  gravatarURL: state.player.gravatarURL,
  score: state.player.score,
  isLoading: state.game.isLoading,
  questions: state.game.questions,
  questionIndex: state.game.questionIndex,
  isResolved: state.game.isResolved,
  secondsLeft: state.game.secondsLeft,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(getQuestionsThunk()),
  answerQuestion: () => dispatch(answerQuestionActionCreator()),
  nextQuestion: (payload) => dispatch(nextQuestionActionCreator(payload)),
  updateSeconds: (payload) => dispatch(updateSecondsActionCreator(payload)),
  updateScore: (payload) => dispatch(updateScoreActionCreator(payload)),
});

TriviaGame.propTypes = {
  secondsLeft: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(TriviaGame);
