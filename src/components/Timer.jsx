import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  componentDidMount() {
    const { setTimer } = this.props;
    setTimer();
    console.log('montou');
  }

  render() {
    const { timer } = this.props;
    return (
      <div>
        { timer }
      </div>
    );
  }
}

Timer.propTypes = PropTypes.shape({
  setTimer: PropTypes.func,
  timer: PropTypes.string,
}).isRequired;
export default Timer;
