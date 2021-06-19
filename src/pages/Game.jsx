import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';

import Question from '../components/Question';
import GameHeader from '../components/GameHeader';
import Timer from '../components/Timer';

import { addToRanking } from '../actions/index';

let timer;
const FIVE = 5;

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerDisabled: false,
      time: 30,
      questionIndex: 0,
    };

    this.getQuestions = this.getQuestions.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
    this.decreaseTime = this.decreaseTime.bind(this);
    this.timerHasMounted = this.timerHasMounted.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.playerResultsToLocalStorage = this.playerResultsToLocalStorage.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  componentWillUnmount() {
    clearInterval(timer);
  }

  async getQuestions() {
    const { token } = this.props;
    const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const { results } = await request.json();
    this.setState({
      questions: results,
    });
  }

  handleNextQuestion() {
    this.setState((prevState) => ({
      questionIndex: prevState.questionIndex + 1,
      time: 30,
      answerDisabled: false,
    }),
    () => this.timerHasMounted());
  }

  decreaseTime() {
    const { time } = this.state;
    if (time > 1) {
      this.setState((prevState) => ({
        time: prevState.time - 1,
      }));
    } else {
      this.setState((prevState) => ({
        time: prevState.time - 1,
      }),
      () => this.stopTimer());
    }
  }

  stopTimer() {
    this.setState({
      answerDisabled: true,
    }, () => clearInterval(timer));
  }

  timerHasMounted() {
    const ONE_SECOND = 1000;
    timer = setInterval(this.decreaseTime, ONE_SECOND);
  }

  playerResultsToLocalStorage(infoToRanking, ranking) {
    const newRanking = [...ranking, infoToRanking];
    localStorage.setItem('ranking', JSON.stringify(newRanking));
  }

  render() {
    const { questions, questionIndex, answerDisabled, time } = this.state;
    const {
      dispatchPlayerInfoToRanking,
      name,
      picture,
      score,
      ranking,
    } = this.props;

    if (questionIndex === FIVE) {
      this.playerResultsToLocalStorage({ name, picture, score }, ranking);
      dispatchPlayerInfoToRanking({ name, picture, score });
      return (<Redirect to="/feedback" />);
    }

    return (
      <section>
        <GameHeader />
        <main>
          { questions ? (
            <main>
              <Question
                result={ questions[questionIndex] }
                handleNext={ this.handleNextQuestion }
                answerDisabled={ answerDisabled }
                stopTimer={ this.stopTimer }
                time={ time }
              />
              <Timer time={ time } hasMounted={ this.timerHasMounted } />
            </main>
          ) : <p>Loading...</p> }
        </main>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const { player: { name, gravatarEmail, score, token }, ranking } = state;
  return {
    name,
    picture: gravatarEmail,
    score,
    token,
    ranking,
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatchPlayerInfoToRanking: (playerInfo) => dispatch(addToRanking(playerInfo)),
});

Game.propTypes = {
  token: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  ranking: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchPlayerInfoToRanking: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
