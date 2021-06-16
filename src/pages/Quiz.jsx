import React, { Component } from 'react';
import Header from '../components/Header';
import Question from '../components/Question';

class Quiz extends Component {
  render() {
    return (
      <div>
        <Header />
        <Question />
        {/* <h1>{questions[0].question}</h1> */}
      </div>
    );
  }
}

export default Quiz;
