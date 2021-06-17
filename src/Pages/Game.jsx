import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import { trivia } from '../actions';
import fetchTrivia from '../services/fetchTrivia';
import './Game.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.saveTriviaOnGlobalState = this.saveTriviaOnGlobalState.bind(this);
    this.colorButton = this.colorButton.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.getTimer = this.getTimer.bind(this);
    this.state = {
      counter: 0,
      showColor: false,
      timerIsOver: false,
      seconds: 30,
      stopTimer: false,
    };
  }

  componentDidMount() {
    this.saveTriviaOnGlobalState();
    const ONE_SECOND = 1000;
    const { stopTimer } = this.state;
    setInterval(() => {
      this.setState((prevState) => (
        {
          seconds: stopTimer ? prevState.seconds : prevState.seconds - 1,
        }
      ));
      this.getTimer();
    }, ONE_SECOND);
    this.resetScore();
  }

  getTimer() {
    const { seconds } = this.state;
    if (seconds <= 0) {
      this.setState({
        timerIsOver: true,
      });
    }
  }

  resetScore() {
    const localStorageState = JSON.parse(localStorage.getItem('state'));
    const { player } = localStorageState;
    player.score = 0;
    localStorage.setItem('state', JSON.stringify({ player }));
  }

  saveScore(scoreToAdd) {
    const localStorageState = JSON.parse(localStorage.getItem('state'));
    const { player } = localStorageState;
    player.score += scoreToAdd;
    localStorage.setItem('state', JSON.stringify({ player }));
  }

  increaseAssertion() {
    const localStorageState = JSON.parse(localStorage.getItem('state'));
    const { player } = localStorageState;
    player.assertions += 1;
    console.log(player);
    localStorage.setItem('state', JSON.stringify({ player }));
    console.log('teste');
  }

  async saveTriviaOnGlobalState() {
    const { dispatchTrivia } = this.props;
    const triviaToDispatch = await fetchTrivia();
    dispatchTrivia(triviaToDispatch);
  }

  nextQuestion() {
    const INITIAL_SECONDS = 30;
    this.setState((prevState) => ({
      counter: prevState.counter + 1,
      showColor: false,
      timerIsOver: false,
      seconds: INITIAL_SECONDS,
    }));
  }

  nextButton() {
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ this.nextQuestion }
      >
        Próxima
      </button>
    );
  }

  colorButton() {
    this.setState({
      showColor: true,
      timerIsOver: true,
    });
  }

  handleClick(correctAnswer, difficulty) {
    this.setState({ stopTimer: true });
    const { seconds } = this.state;
    if (correctAnswer) {
      this.increaseAssertion();
      let difficulttyMultiplier = 0;
      const hardMultiplier = 3;
      switch (difficulty) {
      case 'hard':
        difficulttyMultiplier = hardMultiplier;
        break;
      case 'medium':
        difficulttyMultiplier = 2;
        break;
      default:
        difficulttyMultiplier = 1;
        break;
      }
      const baseScore = 10;
      this.saveScore(baseScore + (seconds * difficulttyMultiplier));
    }
  }

  correctQuestion(isCorrect) {
    const { showColor } = this.state;
    if (showColor && isCorrect) {
      return 'correct';
    }
    if (showColor && isCorrect === false) {
      return 'wrong';
    }
    return 'test';
  }

  renderGame() {
    const { triviaQuest } = this.props;
    const { counter, seconds, timerIsOver, showColor } = this.state;
    const carregando = {
      category: 'Carregando',
      question: 'Carregando',
      correct_answer: 'Carregando',
      incorrect_answers: ['Carregand'],
    };
    const questionToBeRendered = triviaQuest[counter] ? triviaQuest[counter] : carregando;
    const { category, question } = questionToBeRendered;
    const incorrectAnswersObject = questionToBeRendered.incorrect_answers;
    const rightAnswer = questionToBeRendered.correct_answer;
    const allAnswers = [
      ...incorrectAnswersObject,
      rightAnswer,
    ];
    return (
      <div>
        <Header />
        <h1>JOGO AQUI</h1>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question.toString()}</p>
        {allAnswers.sort()
          .map((answer, index) => (
            <button
              disabled={ timerIsOver }
              className={ this.correctQuestion(answer === rightAnswer) }
              type="button"
              key={ index }
              data-testid={ answer === rightAnswer
                ? 'correct-answer' : `wrong-answer-${index}` }
              onClick={ () => {
                this.colorButton();
                this.handleClick((answer === rightAnswer),
                  questionToBeRendered.difficulty);
              } }
            >
              {answer}
            </button>
          ))}
        <p>{seconds > 0 ? seconds : 0}</p>
        { showColor || timerIsOver ? this.nextButton() : null}
      </div>
    );
  }

  render() {
    const { counter } = this.state;
    const maxQuestion = 5;
    if (counter >= maxQuestion) return <Redirect to="/feedback" />;
    return (
      <div>
        {this.renderGame()}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchTrivia: (state) => dispatch(trivia(state)),
});

const mapStateToProps = (state) => ({
  triviaQuest: state.trivia.results,
});

Game.propTypes = {
  triviaQuest: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchTrivia: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
