import React from 'react';

class Timer extends React.Component {
  constructor() {
    super();
    this.startGameTimer = this.startGameTimer.bind(this);
    this.state = {
      seconds: 30,
    };
  }

  componentDidMount() {
    this.startGameTimer();
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.seconds === 1) {
      clearInterval(this.timer);
    }
  }

  refreshTimer() {
    const { seconds } = this.state;
    console.log(seconds);
    this.setState({
      seconds: seconds - 1,
    });
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

export default Timer;
