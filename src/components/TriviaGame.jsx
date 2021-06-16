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

  async componentDidMount() {
    const { token } = localStorage;

    const requestQuestions = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const dataToJSON = await requestQuestions.json();

    this.updateState(dataToJSON);
  }

  render () {
    return ();
  }
}

export default Trivia;
