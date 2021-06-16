import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import GameHeader from './GameHeader';
import './style.css';
import { updatePlayerPoints } from '../actions/index';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      indexQuestion: 0,
      buttonDisabled: false,
      currentTime: 30,
      redirect: false,
    });

    this.renderPage = this.renderPage.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.timer = this.timer.bind(this);
    this.settingState = this.settingState.bind(this);
    this.calculatePoints = this.calculatePoints.bind(this);
    this.verifyAnswers = this.verifyAnswers.bind(this);
    this.setDifficulty = this.setDifficulty.bind(this);
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    const intervalId = setInterval(this.timer, ONE_SECOND);
    this.settingState(intervalId);
    const estadoInicial = {
      player: {
        name: '',
        assertions: 0,
        score: 0,
        gravatarEmail: '',
      },
    };
    const estadoInicialJson = JSON.stringify(estadoInicial);
    localStorage.setItem('state', estadoInicialJson);
  }

  settingState(intervalId) {
    this.setState({
      intervalId,
    });
  }

  setDifficulty(difficulty) {
    const HARD_NUMBER = 3;
    let difficultyValue = 0;
    if (difficulty === 'easy') {
      difficultyValue = 1;
    } else if (difficulty === 'medium') {
      difficultyValue = 2;
    } else {
      difficultyValue = HARD_NUMBER;
    }
    return difficultyValue;
  }

  verifyAnswers(target) {
    const { updatePlayerPointsAction,
      player } = this.props;
    const { name, assertions, score, gravatarEmail } = player;
    const answer = target.getAttribute('data-testid');
    if (answer === 'correct-answer') {
      const correctAnswer = 1;
      const answerPoints = this.calculatePoints();
      const estadoTemporario = {
        player: {
          name,
          assertions: assertions + correctAnswer,
          score: score + answerPoints,
          gravatarEmail,
        },
      };
      updatePlayerPointsAction({ correctAnswer, answerPoints });
      localStorage.setItem('state', JSON.stringify(estadoTemporario));
    }
  }

  timer() {
    const { currentTime, intervalId } = this.state;
    if (currentTime > 0) {
      this.setState({
        currentTime: currentTime - 1,
      });
    } else {
      this.setState({
        buttonDisabled: true,
      });
      clearInterval(intervalId);
    }
  }

  calculatePoints() {
    const { indexQuestion } = this.state;
    const { apiResult: { results } } = this.props;
    const a = results[indexQuestion];
    const BASE_VALUE = 10;
    const difficultyValue = this.setDifficulty(a.difficulty);
    const currentTimeTagP = document.querySelector('#timer').innerHTML;
    const currentTime = currentTimeTagP.split(' ')[2];
    if (currentTime.startsWith('0')) {
      const result = BASE_VALUE + ((Number(currentTime[1]) * difficultyValue));
      return result;
    }
    const result = BASE_VALUE + (Number(currentTime) * difficultyValue);
    return result;
  }

  handleClick({ target }) {
    const wrongAnswer = document.querySelectorAll('.answer-button-wrong');
    const correctAnswer = document.querySelector('.answer-button-correct');
    const buttonNext = document.querySelector('.next-button');

    correctAnswer.classList.add('answer-correct');
    wrongAnswer.forEach((answer) => {
      answer.classList.add('answer-wrong');
    });

    this.verifyAnswers(target);
    buttonNext.style.display = 'initial';
    const { intervalId } = this.state;
    clearInterval(intervalId);
  }

  nextQuestion() {
    const { indexQuestion } = this.state;
    const NUMERO_MAX_RESPOSTAS = 4;
    if (indexQuestion >= NUMERO_MAX_RESPOSTAS) {
      const buttonNext = document.querySelector('.next-button');
      buttonNext.style.display = 'none';
      this.setState({
        redirect: true,
      });
    } else {
      this.setState({ indexQuestion: indexQuestion + 1 });
      const wrongAnswer = document.querySelectorAll('.answer-button-wrong');
      const correctAnswer = document.querySelector('.answer-button-correct');
      correctAnswer.classList.remove('answer-correct');
      wrongAnswer.forEach((answer) => {
        answer.classList.remove('answer-wrong');
      });
    }
    this.setState({
      currentTime: 30,
    });
    const ONE_SECOND = 1000;
    const intervalId = setInterval(this.timer, ONE_SECOND);
    this.settingState(intervalId);
  }

  renderPage() {
    const { indexQuestion, buttonDisabled } = this.state;
    const { apiResult } = this.props;

    if (apiResult.response_code === 0) {
      const NUMERO_PARA_SORTEAR_RESPOSTAS = 5;
      const answersArray = apiResult.results[indexQuestion].incorrect_answers
        .concat(apiResult.results[indexQuestion].correct_answer);
      const newRandomArray = answersArray
        .sort(() => Math.random() - NUMERO_PARA_SORTEAR_RESPOSTAS);
      return (
        <section>
          <p
            data-testid="question-category"
          >
            { apiResult.results[indexQuestion].category }
          </p>
          <p data-testid="question-text">{ apiResult.results[indexQuestion].question }</p>
          <section className="section-answer-buttons">
            { newRandomArray.map((answer, index) => (
              <button
                data-testid={ answer === apiResult.results[indexQuestion].correct_answer
                  ? 'correct-answer' : `wrong-answer-${index}` }
                key={ index }
                type="submit"
                disabled={ buttonDisabled }
                className={ answer === apiResult.results[indexQuestion].correct_answer
                  ? 'answer-button-correct' : 'answer-button-wrong' }
                onClick={ (evento) => this.handleClick(evento) }
              >
                {answer}
              </button>))}

          </section>
        </section>
      );
    }
  }

  render() {
    const { currentTime } = this.state;
    const { redirect } = this.state;
    if (redirect) { return <Redirect to="/feedback" />; }
    return (
      <section>
        <GameHeader />
        {this.renderPage()}
        <button
          data-testid="btn-next"
          type="button"
          className="next-button"
          onClick={ this.nextQuestion }
        >
          Próxima
        </button>
        <p id="timer">{`Tempo restante: ${currentTime}`}</p>
      </section>

    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  updatePlayerPointsAction: (points) => dispatch(updatePlayerPoints(points)),
});

const mapStateToProps = (state) => ({
  apiResult: state.game,
  player: state.player,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  updatePlayerPointsAction: PropTypes.func.isRequired,
  player: PropTypes.shape({
    name: PropTypes.string,
    assertions: PropTypes.number,
    score: PropTypes.number,
    gravatarEmail: PropTypes.string.isRequired,
  }).isRequired,
  apiResult: PropTypes.shape({
    response_code: PropTypes.number.isRequired,
    results: PropTypes.shape({
      difficulty: PropTypes.number,
    }),
  }).isRequired,
};
