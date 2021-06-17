import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  answerQuestionActionCreator,
  updateSecondsActionCreator,
} from '../redux/actions';

class Timer extends React.Component {
  constructor() {
    super();

    this.refreshTimer = this.refreshTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.secondsLeft === 1) {
      prevProps.answerQuestion();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  refreshTimer() {
    const { secondsLeft, updateSeconds } = this.props;
    // console.log(secondsLeft);
    updateSeconds({ secondsLeft: secondsLeft - 1 });
  }

  startTimer() {
    const ONE_SECOND = 1000;
    this.timer = setInterval(() => this.refreshTimer(), ONE_SECOND);
  }

  render() {
    const { secondsLeft } = this.props;
    return (
      <span>{ secondsLeft }</span>
    );
  }
}

const mapStateToProps = (state) => ({
  secondsLeft: state.game.secondsLeft,
});

const mapDispatchToProps = (dispatch) => ({
  answerQuestion: () => dispatch(answerQuestionActionCreator()),
  updateSeconds: (payload) => dispatch(updateSecondsActionCreator(payload)),
});

Timer.propTypes = {
  secondsLeft: PropTypes.number,
  updateSeconds: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
