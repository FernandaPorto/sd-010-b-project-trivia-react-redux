import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateTime } from '../action';

const ONE_SECONDS = 1000;

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
    };
    this.starTimer = this.starTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  componentDidMount() {
    this.starTimer();
  }

  starTimer() {
    this.timerInterval = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }, ONE_SECONDS);
  }

  stopTimer() {
    clearInterval(this.timerInterval);
    this.setState({ seconds: '--' });
  }

  render() {
    const { disableButtons, updateSeconds, wasAnswered } = this.props;
    const { seconds } = this.state;
    if (seconds < 1 || wasAnswered) {
      this.stopTimer();
      disableButtons();
    }

    updateSeconds(seconds);

    return (
      <p>
        Tempo:
        {' '}
        {seconds}
        s
      </p>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateSeconds: (value) => dispatch(updateTime(value)),
});

Timer.propTypes = {
  disableButtons: PropTypes.boolean,
  updateSeconds: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Timer);
