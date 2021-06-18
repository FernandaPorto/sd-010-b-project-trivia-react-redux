import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Question from '../components/Question';
import Answer from '../components/Answer';
import Timer from '../components/Timer';
import { revealedAction } from '../actions/gameAction';
import { timerActions } from '../actions/correctAnswer';
import Header from '../components/Header';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 30,
      number: 0,
      results: props.request,
    };

    this.nextQuestion = this.nextQuestion.bind(this);
    this.timer = this.timer.bind(this);
    this.stateInterval = this.stateInterval.bind(this);
  }

  componentDidMount() {
    const { count, name, email, assertions } = this.props;
    this.stateInterval();
    const player = {
      name,
      assertions,
      score: count,
      gravatarEmail: email,
    };
    localStorage.setItem('state', JSON.stringify({ player }));
  }

  stateInterval() {
    this.setState({ time: 30 });
    const ONE_SECOND = 1000;
    const interval = setInterval(this.timer, ONE_SECOND);
    this.setState({ interval });
  }

  timer() {
    const { dispatchRevealed, updateTimer, isRevealed } = this.props;
    const { time, interval } = this.state;
    if (time > 0 && !isRevealed) {
      this.setState((prevState) => ({
        time: prevState.time - 1,
      }), () => updateTimer(time));
    } else {
      dispatchRevealed(true);
      clearInterval(interval);
    }
  }

  nextQuestion() {
    const { dispatchRevealed, history } = this.props;
    const { number, results } = this.state;
    dispatchRevealed(false);
    if (number > (results.length - 2)) {
      return history.push('/feedback');
    }
    if (number < (results.length - 1)) {
      this.setState((prevState) => ({
        number: prevState.number + 1,
      }), () => this.stateInterval());
    }
  }

  render() {
    const { number, results, time } = this.state;
    return (
      <div>
        <Header />
        { results && (
          <div>
            <Question number={ number } results={ results } />
            <Answer
              number={ number }
              results={ results }
              nextQuestion={ this.nextQuestion }
            />
            <Timer results={ results } time={ time } />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  count: state.player.score,
  assertions: state.player.assertions,
  name: state.player.name,
  email: state.player.gravatarEmail,
  request: state.apiReducer.request,
  isRevealed: state.game.isRevealed,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchRevealed: (payload) => dispatch(revealedAction(payload)),
  updateTimer: (time) => dispatch(timerActions(time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  count: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  updateTimer: PropTypes.number.isRequired,
  isRevealed: PropTypes.bool.isRequired,
  request: PropTypes.arrayOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatchRevealed: PropTypes.func.isRequired,
};
