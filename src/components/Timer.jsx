import React from 'react';
import { connect } from 'react-redux';

import {
  answerQuestionActionCreator,
  updateSecondsActionCreator,
} from '../redux/actions';

class Timer extends React.Component {
  componentDidMount() {
    const ONE_SECOND = 1000;
    this.timer = setInterval(() => {
      const { secondsLeft, updateSeconds } = this.props;
      updateSeconds({ secondsLeft: secondsLeft - 1 });
    }, ONE_SECOND);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.secondsLeft === 1) {
      prevProps.answerQuestion();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { secondsLeft } = this.props;

    return <span>{secondsLeft}</span>;
  }
}

const mapStateToProps = ({ game }) => ({
  secondsLeft: game.secondsLeft,
});

const mapDispatchToProps = (dispatch) => ({
  answerQuestion: () => dispatch(answerQuestionActionCreator()),
  updateSeconds: (payload) => dispatch(updateSecondsActionCreator(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
