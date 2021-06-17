import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { receiveSeconds, toggleStatusCronometer } from '../actions';

class Cronometer extends Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 30 };
  }

  componentDidMount() {
    const ONE_SECOND = 1000; // 1 second in miliseconds
    this.cronometerInterval = setInterval(() => {
      this.setState((state) => ({ seconds: state.seconds - 1 }));
    }, ONE_SECOND);
  }

  componentDidUpdate(prevProps, prevState) {
    const { statusCronometer, getSeconds } = this.props;
    const MIN_SECONDS = 0;
    if (prevState.seconds === MIN_SECONDS || statusCronometer === 'off') {
      getSeconds(prevState.seconds);
      clearInterval(this.cronometerInterval);
      // this.resetCronometer();
    }
  }

  resetCronometer() {
    this.setState({
      seconds: 0,
    });
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => { button.disabled = true; });
    clearInterval(this.cronometerInterval);
  }

  render() {
    const { seconds } = this.state;
    return <div>{ seconds }</div>;
  }
}

const mapStateToProps = (state) => ({
  statusCronometer: state.trivia.statusCronometer,
});

const mapDispatchToProps = (dispatch) => ({
  setStatusCronometer: (status) => dispatch(toggleStatusCronometer(status)),
  getSeconds: (seconds) => dispatch(receiveSeconds(seconds)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cronometer);

Cronometer.propTypes = {
  statusCronometer: propTypes.string.isRequired,
  getSeconds: propTypes.func.isRequired,
};
