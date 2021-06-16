import React, { Component } from 'react';

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
    const MIN_SECONDS = 0;
    if (prevState.seconds === MIN_SECONDS) {
      this.resetCronometer();
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

export default Cronometer;
