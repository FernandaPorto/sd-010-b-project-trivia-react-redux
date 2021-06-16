import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { decreaseOneSecond, disableButtons, changeStyles } from '../actions/index';

class Countdown extends Component {
  componentDidMount() {
    this.countdown();
  }

  countdown() {
    const ONE_SECOND = 1000;
    this.myInterval = setInterval(() => {
      const { decreaseCount, actualCount, disabledButtons, showColors } = this.props;
      decreaseCount();
      if (actualCount === 1) {
        clearInterval(this.myInterval);
        disabledButtons();
        showColors();
      }
    }, ONE_SECOND);
  }

  render() {
    const { actualCount } = this.props;
    return (
      <div>
        <p>{ actualCount }</p>
      </div>
    );
  }
}

Countdown.propTypes = {
  decreaseCount: PropTypes.func.isRequired,
  showColors: PropTypes.func.isRequired,
  disabledButtons: PropTypes.func.isRequired,
  actualCount: PropTypes.number.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  decreaseCount: () => dispatch(decreaseOneSecond()),
  disabledButtons: () => dispatch(disableButtons()),
  showColors: () => dispatch(changeStyles()),
});

const mapStateToProps = (state) => ({
  actualCount: state.countdownReducer.count,
});

export default connect(mapStateToProps, mapDispatchToProps)(Countdown);
