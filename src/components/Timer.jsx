import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { enableDisable, updateTimer } from '../actions/controls';

const ONE_SECOND = 1000;
let theEnd;

class Timer extends Component {
  componentDidMount() {
    theEnd = setInterval(() => { this.regress(); }, ONE_SECOND);
  }

  componentWillUnmount() {
    clearInterval(theEnd);
  }

  regress() {
    const { timer, toggleEnable, timerUpdate } = this.props;
    if (timer > 0) {
      timerUpdate();
    } else {
      toggleEnable(true);
    }
  }

  render() {
    const { timer } = this.props;
    return (
      <div>{ timer }</div>
    );
  }
}

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
  toggleEnable: PropTypes.func.isRequired,
  timerUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  timer: state.controls.timer,
});

const mapDispatchToProps = (dispatch) => ({
  toggleEnable: (value) => dispatch(enableDisable(value)),
  timerUpdate: (time) => dispatch(updateTimer(time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
