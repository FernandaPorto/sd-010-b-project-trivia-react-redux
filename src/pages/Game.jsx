import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GameHeader from '../components/GameHeader';
import './style.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      indexQuestion: 0,
      buttonDisabled: false,
      currentTime: 30,
    });

    this.renderPage = this.renderPage.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.timer = this.timer.bind(this);
    this.settingState = this.settingState.bind(this);
    this.calculatePoints = this.calculatePoints.bind(this);
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    const intervalId = setInterval(this.timer, ONE_SECOND);
    this.settingState(intervalId);
  }

  settingState(intervalId) {
    this.setState({
      intervalId,
    });
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
    this.calculatePoints(target);
    const { intervalId } = this.state;
    clearInterval(intervalId);
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
    const { currentTime } = this.state;

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

const mapStateToProps = (state) => ({
  apiResult: state.game,
});

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  apiResult: PropTypes.shape({
    response_code: PropTypes.number.isRequired,
    results: PropTypes.shape({
      difficulty: PropTypes.number,
    }),
  }).isRequired,
};
