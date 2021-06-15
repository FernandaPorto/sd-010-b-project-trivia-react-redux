import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GameHeader from '../components/GameHeader';
import './style.css';
import { updatePlayerPoints } from '../actions/index';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      indexQuestion: 0,
      buttonDisabled: false,
    });

    this.renderPage = this.renderPage.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.calculatePoints = this.calculatePoints.bind(this);
    this.verifyAnswers = this.verifyAnswers.bind(this);
  }

  componentDidMount() {
    const tempo = 30;

    this.startTimer(tempo);
  }

  startTimer(duration) {
    const ONE_SEC = 1000;
    const MINUTO = 60;
    const DIGITO_DECIMAL = 10;
    let timer = duration;
    const display = document.getElementById('timer');
    let seconds;
    setInterval(() => {
      seconds = parseInt(timer % MINUTO, 10);

      // a seguinte linha exibe, por exemplo, 03 ao invés de 3 no timer
      seconds = seconds < DIGITO_DECIMAL ? `0${seconds}` : seconds;
      display.textContent = `Tempo restante: ${seconds}`;
      timer -= 1;
      if (timer < 0) {
        timer = 0;
        this.setState({
          buttonDisabled: true,
        });
      }
    }, ONE_SEC);
  }

  verifyAnswers(target) {
    const { updatePlayerPointsAction, player: { name, assertions, score, gravatarEmail } } = this.props;
    const answer = target.getAttribute('data-testid');
    if (answer === 'correct-answer') {
      const correctAnswer = 1;
      const answerPoints = this.calculatePoints();
      const estadoTemporario = {
        name,
        assertions: assertions + correctAnswer,
        score: score + answerPoints,
        gravatarEmail,
      };
      updatePlayerPointsAction({ correctAnswer, answerPoints });
      localStorage.setItem('state', JSON.stringify(estadoTemporario));
    }
  }

  calculatePoints() {
    const { apiResult: { results: { difficulty } } } = this.props;
    const BASE_VALUE = 10;
    const HARD_NUMBER = 3;
    let difficultyValue = 0;
    if (difficulty === 'easy') {
      difficultyValue = 1;
    } else if (difficulty === 'medium') {
      difficultyValue = 2;
    } else {
      difficultyValue = HARD_NUMBER;
    }
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
    buttonNext.style.display = 'initial';

    this.verifyAnswers(target);
  }

  nextQuestion() {
    const { indexQuestion } = this.state;
    const NUMERO_MAX_RESPOSTAS = 4;
    if (indexQuestion >= NUMERO_MAX_RESPOSTAS) {
      const buttonNext = document.querySelector('.next-button');
      buttonNext.style.display = 'none';
    } else {
      this.setState({ indexQuestion: indexQuestion + 1 });
      const wrongAnswer = document.querySelectorAll('.answer-button-wrong');
      const correctAnswer = document.querySelector('.answer-button-correct');
      correctAnswer.classList.remove('answer-correct');
      wrongAnswer.forEach((answer) => {
        answer.classList.remove('answer-wrong');
      });
    }
  }

  renderPage() {
    const { indexQuestion, buttonDisabled } = this.state;
    const { apiResult } = this.props;

    if (apiResult.response_code === 0) {
      const NUMERO_PARA_SORTEAR_RESPOSTAS = 0.5;
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
        <p id="timer">Tempo restante:</p>
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
  apiResult: PropTypes.shape({
    response_code: PropTypes.number.isRequired,
    results: PropTypes.shape({}),
  }).isRequired,
};
