import React, { Component } from 'react';

class Answers extends Component {
  render() {
    const { correct, incorrect } = this.props;
    const allAnswers = [correct, ...incorrect];
    console.log(correct, incorrect, allAnswers);

    return (
      <div>{allAnswers[0]}</div>
    );
  }
}

export default Answers;
