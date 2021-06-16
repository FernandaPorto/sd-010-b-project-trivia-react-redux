import React from 'react';

class Trivia extends React.Component {
  constructor(props) {
    super(props);
    this.updateState = this.updateState.bind(this);
    this.renderQuestion = this.renderQuestion.bind(this);


    this.state = {
      loading: true,
      questions: [],
    };
  }
  
  render () {
    return ();
  }
}

export default Trivia;
