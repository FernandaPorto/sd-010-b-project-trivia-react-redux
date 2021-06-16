import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import {
  sendGravatarToRedux,
  changeStyles,
  resetStyles,
  startCounting,
  getRigth,
} from '../actions/index';
import TrueButtonIsCorrect from '../components/TrueButtonIsCorrect';
import FalseButtonIsCorrect from '../components/FalseButtonIsCorrect';
import Countdown from '../components/Countdown';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      indexQuestion: 0,
      score: 0,
      assertions: 0,
    };
    this.saveQuestionsInState = this.saveQuestionsInState.bind(this);
    this.renderQuestion = this.renderQuestion.bind(this);
  }

  componentDidMount() {
    const { saveGravatar, email, token } = this.props;
    const hashEmail = md5(email).toString();
    const URL = `https://www.gravatar.com/avatar/${hashEmail}`;
    fetch(URL)
      .then(({ url }) => saveGravatar(url));
    const urlTrivia = `https://opentdb.com/api.php?amount=5&token=${token}`;
    fetch(urlTrivia)
      .then((data) => data.json())
      .then((questions) => this.saveQuestionsInState(questions));
  }

  calculatePoints() {
    const { results, indexQuestion } = this.state;
    const { actualCount, clickedAnswer } = this.props;
    const defaultPoint = 10;
    const question = results[indexQuestion];
    const dificuldadeAtual = question.difficulty;
    const dificuldade = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    const score = defaultPoint + (actualCount * dificuldade[dificuldadeAtual]);
    clickedAnswer(score);
    this.handleLocalStorage(score);
  }

  handleLocalStorage(score) {
    const player = JSON.parse(localStorage.getItem('player'));
    player.assertions += 1;
    player.score += score;
    localStorage.setItem('player', JSON.stringify(player));
  }

  saveQuestionsInState({ results }) {
    this.setState({
      results,
    });
  }

  nextIndex() {
    const { resetColors, restartCount } = this.props;
    resetColors();
    restartCount();
    const { indexQuestion, results } = this.state;
    if (indexQuestion === results.length - 1) {
      return false;
    }
    this.setState((oldState) => ({
      indexQuestion: oldState.indexQuestion + 1,
    }));
  }

  selectedAnswer() {
    const { showColors } = this.props;
    showColors();
    this.calculatePoints();
  }

  multipleAnswers({
    correct_answer: correctAnswer,
    incorrect_answers: incorrectAnswers,
  }) {
    const { wrong, rigth, disableButtons, showColors } = this.props;
    const rightAnswer = (
      <button
        type="button"
        data-testid="correct-answer"
        key="4"
        style={ {
          border: rigth,
        } }
        onClick={ () => this.selectedAnswer() }
        disabled={ disableButtons }
      >
        { correctAnswer }
      </button>
    );
    const wrongAnswers = (
      incorrectAnswers.map((answer, index) => (
        <button
          type="button"
          data-testid={ `wrong-answer-${index}` }
          key={ index }
          style={ {
            border: wrong,
          } }
          onClick={ () => showColors() }
          disabled={ disableButtons }
        >
          { answer }
        </button>
      ))
    );
    const MAX_INDEX = 3;
    const randomIndex = Math.floor(Math.random() * (MAX_INDEX - 0 + 1)) + 0;
    wrongAnswers.splice(randomIndex, 0, rightAnswer);
    const answers = wrongAnswers;
    return (
      <div>
        { answers }
      </div>
    );
  }

  trueOrFalseAnswers({ correct_answer: correctAnswer }) {
    return (
      <div>
        { correctAnswer === 'True' ? <TrueButtonIsCorrect /> : <FalseButtonIsCorrect /> }
      </div>
    );
  }

  renderQuestion() {
    const { results, indexQuestion } = this.state;
    const question = results[indexQuestion];
    if (question !== undefined) {
      return (
        <div>
          <Countdown />
          <h3 data-testid="question-category">{ question.category }</h3>
          <h4 data-testid="question-text">{ question.question }</h4>
          { question.type === 'multiple'
            ? this.multipleAnswers(question) : this.trueOrFalseAnswers(question) }
        </div>
      );
    }
  }

  render() {
    const { nome, gravatar } = this.props;
    const { results } = this.state;
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ gravatar }
            alt={ nome }
          />
          <p data-testid="header-player-name">{nome}</p>
          <p data-testid="header-score">0</p>
        </header>
        <main>
          { results !== [] && this.renderQuestion() }
        </main>
        <button type="button" onClick={ () => this.nextIndex() }>Próxima pergunta</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveGravatar: (gravatar) => dispatch(sendGravatarToRedux(gravatar)),
  showColors: () => dispatch(changeStyles()),
  resetColors: () => dispatch(resetStyles()),
  restartCount: () => dispatch(startCounting()),
  clickedAnswer: (points) => dispatch(getRigth(points)),
});

const mapStateToProps = (state) => ({
  email: state.playerReducer.email,
  nome: state.playerReducer.nome,
  gravatar: state.playerReducer.gravatar,
  token: state.tokenState.token,
  rigth: state.gameReducer.styles.rigth,
  wrong: state.gameReducer.styles.wrong,
  disableButtons: state.gameReducer.disabledButtons,
  actualCount: state.countdownReducer.count,
  score: state.playerReducer.score,
  assertions: state.playerReducer.assertions,
});

Game.propTypes = {
  saveGravatar: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
  gravatar: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  resetColors: PropTypes.func.isRequired,
  showColors: PropTypes.func.isRequired,
  wrong: PropTypes.string.isRequired,
  rigth: PropTypes.string.isRequired,
  restartCount: PropTypes.func.isRequired,
  disableButtons: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
