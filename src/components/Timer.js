import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { revealedAction } from '../actions/gameAction';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 30,
    };
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    setInterval(this.timer, ONE_SECOND);
  }

  timer() {
    const { dispatchRevealed } = this.props;
    const { time } = this.state;
    if (time > 0) {
      this.setState((prevState) => ({
        time: prevState.time - 1,
      }));
    } else {
      dispatchRevealed(true);
    }
  }

  stopTimer() {
    const { time } = this.state;
    if (time === 0) {
      clearInterval();
    }
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
};

const mapDispatchToProps = (dispatch) => ({
  dispatchRevealed: (payload) => dispatch(revealedAction(payload)),
});

export default connect(null, mapDispatchToProps)(Timer);
