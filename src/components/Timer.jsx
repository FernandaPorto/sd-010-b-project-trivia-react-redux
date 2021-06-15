import React, { Component } from 'react';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: 3,
    };

    this.setTimer = this.setTimer.bind(this);
  }

  componentDidMount() {
    this.setTimer();
  }

  componentWillUnmount() {
    console.log('desmontou');
  }

  setTimer() {
    // const { timer } = this.state;
    // clearInterval(this.setTimer);
    const ONE_SECOND = 1000;
    setInterval(() => {
      this.setState((oldState) => ({
        timer: oldState.timer - 1,
      }));
    }, ONE_SECOND);
  }

  render() {
    const { timer } = this.state;
    if (timer <= 0) {
      clearInterval(this.setTimer);
      console.log('saiu');
    }
    return (
      <div>
        { timer }
      </div>
    );
  }
}

export default Timer;
