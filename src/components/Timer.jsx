import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { toggleTimerActionCreator } from '../redux/actions';

class Timer extends React.Component {
  constructor() {
    super();
    this.startGameTimer = this.startGameTimer.bind(this);
    this.refreshTimer = this.refreshTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);

    this.state = {
      seconds: 30,
    };
  }

  componentDidMount() {
    this.startGameTimer();
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.seconds === 1) {
      this.stopTimer();
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  refreshTimer() {
    const { seconds } = this.state;
    console.log(seconds);
    this.setState({
      seconds: seconds - 1,
    });
  }

  stopTimer() {
    const { toggleTimer } = this.props;

    clearInterval(this.timer);
    toggleTimer();
  }

  startGameTimer() {
    const ONE_SECOND = 1000;
    this.timer = setInterval(() => this.refreshTimer(), ONE_SECOND);
  }

  render() {
    const { seconds } = this.state;
    return (
      <h3>{ seconds }</h3>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  toggleTimer: () => dispatch(toggleTimerActionCreator()),
});

Timer.propTypes = {
  toggleTimer: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Timer);
