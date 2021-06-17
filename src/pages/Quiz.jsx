import React, { Component } from 'react';
import Header from '../components/Header';
import Question from '../components/Question';
import FeedBack from './FeedBack';

class Quiz extends Component {
<<<<<<< HEAD
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };
  }

=======
>>>>>>> bac4ae076cddf675b2c2b101a0b67e754c74b018
  render() {
    return (
      <div>
        <Header />
        <Question />
        {/* <FeedBack /> */}
        {/* <h1>{questions[0].question}</h1> */}
      </div>
    );
  }
}

export default Quiz;
