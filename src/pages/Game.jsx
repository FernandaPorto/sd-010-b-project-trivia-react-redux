import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import './css/Game.css';
import Header from '../components/Header';
import Questions from '../components/Questions';
import { restoreFromLocalStorage, saveLocalStorage } from '../functions';
import { addScore } from '../redux/actions/player';
import { newAnswers } from '../redux/actions/game';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 30,
      stopTime: false,
      indexQuestion: 0,
      chosenAnswer: false,
      disabledButton: false,
    };
    this.timer = this.timer.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.calcPointsScore = this.calcPointsScore.bind(this);
    this.buttonNext = this.buttonNext.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    this.timer();
  }

  componentDidUpdate() {
    this.stopTimer();
  }

  stopTimer() {
    const { time, stopTime, disabledButton, chosenAnswer } = this.state;
    if ((time === 0 || stopTime === true)) {
      clearInterval(this.time);
    }
    if ((time === 0 || chosenAnswer) && !disabledButton) {
      this.setState({ disabledButton: true });
    }
  }

  timer() {
    const ONE_SEC = 1000;
    this.time = setInterval(() => {
      this.setState((prevState) => ({ time: prevState.time - 1 }));
    }, ONE_SEC);
  }

  nextQuestion() {
    const {
      state: { indexQuestion },
      props: { newAnswers: uptAnswers, history, questionsNumber, name, score, picture },
    } = this;

    this.setState({
      indexQuestion: indexQuestion + 1,
      chosenAnswer: false,
      disabledButton: false,
      stopTime: false,
      time: 30,
    });

    if (indexQuestion === (questionsNumber - 1)) {
      const key = 'ranking';
      const ranking = (restoreFromLocalStorage(key) !== '')
        ? restoreFromLocalStorage(key) : [];
      ranking.push({
        name,
        score,
        picture,
      });
      saveLocalStorage(key, ranking);
      history.push('/feedback');
    } else {
      uptAnswers(true);
      this.timer();
    }
  }

  buttonNext() {
    const { chosenAnswer, time, indexQuestion } = this.state;
    const { questionsNumber } = this.props;

    if (chosenAnswer || time === 0) {
      return (
        <button
          type="button"
          data-testid="btn-next"
          onClick={ this.nextQuestion }
        >
          {(indexQuestion === (questionsNumber - 1)) ? 'Feedback' : 'Próxima Pergunta'}
        </button>
      );
    }
  }

  calcPointsScore({ target: { innerText } }) {
    const { state: { time, indexQuestion }, props: { questions } } = this;
    const questionSelected = questions[indexQuestion];
    const { correct_answer: correctAnswer, difficulty } = questionSelected;
    const answer = innerText;
    const level = { easy: 1, medium: 2, hard: 3 };
    const INITIAL_VALUE = 10;

    if (answer === correctAnswer) {
      const { easy, medium, hard } = level;
      switch (difficulty) {
      case 'easy':
        return (INITIAL_VALUE + (time * easy));
      case 'medium':
        return (INITIAL_VALUE + (time * medium));
      case 'hard':
        return (INITIAL_VALUE + (time * hard));
      default:
        return '';
      }
    }
  }

  handleClick(event) {
    const {
      props: { addScore: addToScore, score, name, gravatarEmail,
      } } = this;

    this.setState({
      stopTime: true,
      chosenAnswer: true,
    });
    const scorePage = this.calcPointsScore(event);
    if (scorePage) {
      const currScore = score + scorePage;
      const newScore = {
        player: {
          name,
          gravatarEmail,
          score: currScore,
        },
      };
      const key = 'state';
      saveLocalStorage(key, newScore);
      addToScore(currScore);
    }
  }

  render() {
    const {
      time, indexQuestion, chosenAnswer, disabledButton,
    } = this.state;

    return (
      <div>
        <Header />
        <Questions
          handleClick={ this.handleClick }
          indexQuestion={ indexQuestion }
          chosenAnswer={ chosenAnswer }
          disabledButton={ disabledButton }
        />
        <h5>{`Tempo: ${time}`}</h5>
        { this.buttonNext() }
      </div>
    );
  }
}

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  questionsNumber: PropTypes.number.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  addScore: PropTypes.func.isRequired,
  newAnswers: PropTypes.func.isRequired,
  picture: PropTypes.string.isRequired,
};

const mapStateToProps = ({
  game: { questions, questionsNumber },
  player: { name, gravatarEmail, score, picture },
}) => ({

  questions,
  questionsNumber,
  name,
  gravatarEmail,
  score,
  picture,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ addScore, newAnswers }, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Game);
