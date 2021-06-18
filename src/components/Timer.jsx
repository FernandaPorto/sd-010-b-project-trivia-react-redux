import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Timer extends Component {
  render() {
    const { time } = this.props;
    return <div>{time}</div>;
  }
}

const mapStateToProps = ({ timerReducer: { time } }) => ({ time });

Timer.propTypes = {
  time: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Timer);
