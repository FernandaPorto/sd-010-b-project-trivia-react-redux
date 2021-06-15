import React, { Component } from 'react';

class Timer extends Component {

  componentDidMount() {
    const { setTimer } = this.props
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

export default Timer;
