import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

// import { revealedAction } from '../actions/gameAction';
// import { timerActions } from '../actions/correctAnswer';

export default class Timer extends Component {
  render() {
    const { time } = this.props;
    return (
      <div>
        { time }
      </div>
    );
  }
}

Timer.propTypes = {
  time: PropTypes.number.isRequired,
};

// const mapDispatchToProps = (dispatch) => ({
//   dispatchRevealed: (payload) => dispatch(revealedAction(payload)),
//   updateTimer: (time) => dispatch(timerActions(time)),
// });

// const mapStateToProps = (state) => ({
//   isRevealed: state.game.isRevealed,
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Timer);
