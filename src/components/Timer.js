import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { revealedAction } from '../actions/gameAction';
import { timerActions } from '../actions/correctAnswer';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 30,
    };
    this.timer = this.timer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    const interval = setInterval(this.timer, ONE_SECOND);
    this.stateInterval(interval);
  }

  stateInterval(interval) {
    this.setState({ interval });
  }

  timer() {
    const { dispatchRevealed, updateTimer, isRevealed } = this.props;
    const { time } = this.state;
    if (time > 0 && !isRevealed) {
      this.setState((prevState) => ({
        time: prevState.time - 1,
      }), () => updateTimer(time));
    } else {
      dispatchRevealed(true);
      this.stopTimer();
    }
  }

  stopTimer() {
    const { interval } = this.state;
    clearInterval(interval);
  }

  render() {
    const { time } = this.state;
    return (
      <div>
        { time }
      </div>
    );
  }
}

Timer.propTypes = {
  dispatchRevealed: PropTypes.func.isRequired,
  updateTimer: PropTypes.number.isRequired,
  isRevealed: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchRevealed: (payload) => dispatch(revealedAction(payload)),
  updateTimer: (time) => dispatch(timerActions(time)),
});

const mapStateToProps = (state) => ({
  isRevealed: state.game.isRevealed,
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
