import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { actionFetchGameData,
  pauseTime,
  actionStart,
  actionResetGameData } from '../actions';
import Questions from './Questions';
import Loading from './Loading';

class Controller extends Component {
  constructor(props) {
    super(props);

    this.handleNextQuestion = this.handleNextQuestion.bind(this);

    this.state = {
      count: 0,
      redirect: false,
    };
  }

  componentDidMount() {
    const { fetchGameData, token } = this.props;
    fetchGameData(token);
  }

  handleLocalStora() {
    const { name, gravatar, score } = this.props;
    const newPlayer = { name, score, picture: gravatar };
    const playerData = localStorage.getItem('ranking');

    if (playerData) {
      let playerArr = JSON.parse(playerData);
      playerArr = [...playerArr, newPlayer];
      localStorage.setItem('ranking', JSON.stringify(playerArr));
    } else {
      const playerArr = [newPlayer];
      localStorage.setItem('ranking', JSON.stringify(playerArr));
    }
  }

  handleNextQuestion() {
    const { start, resetGame } = this.props;
    const { count } = this.state;
    const NUMBER = 4;

    if (count === NUMBER) {
      resetGame();
      this.handleLocalStora();
      this.setState({ redirect: true });
    }

    this.setState((prev) => ({
      count: prev.count + 1,
    }));

    start();
  }

  render() {
    const { gameData, currentTime, isTimerPaused } = this.props;
    const { count, startTime, redirect } = this.state;
    if (redirect) return <Redirect to="/feedback" />;

    return (
      <div>
        {!gameData.length ? (
          <Loading />
        ) : (
          <>
            {/* <Timer count={ count } /> */}
            <Questions questionData={ gameData[count] } startTime={ startTime } />
          </>
        )}
        {(currentTime === 0 || isTimerPaused) && (
          <button
            onClick={ this.handleNextQuestion }
            type="button"
            data-testid="btn-next"
          >
            Next
          </button>
        )}
      </div>
    );
  }
}

Controller.propTypes = {
  fetchGameData: PropTypes.func.isRequired,
  gameData: PropTypes.arrayOf(PropTypes.object).isRequired,
  token: PropTypes.string.isRequired,
  isTimerPaused: PropTypes.bool.isRequired,
  currentTime: PropTypes.number.isRequired,
  start: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatar: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  gameData: state.game.gameData,
  token: state.user.token,
  isTimerPaused: state.time.isTimerPaused,
  currentTime: state.time.currentTime,
  name: state.user.name,
  score: state.user.score,
  gravatar: state.user.gravatar,
});

const mapDispatchToProps = (dispatch) => ({
  fetchGameData: (token) => dispatch(actionFetchGameData(token)),
  stopTimer: () => dispatch(pauseTime()),
  start: () => dispatch(actionStart()),
  resetGame: () => dispatch(actionResetGameData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controller);
