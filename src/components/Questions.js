import React, { Component } from 'react';

class Questions extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { ...props, next: false, answers: [] };
    this.randAnswers = this.randAnswers.bind(this);
    this.renderAnswers = this.renderAnswers.bind(this);
  }

  componentDidMount() {
    this.randAnswers();
  }

  randAnswers() {
    const { correct_answer: c, incorrect_answers: i } = this.state;
    const answers = [c, ...i];
    const newArr = [];
    while (newArr.length < answers.length) {
      const rand = Math.floor(Math.random() * answers.length);
      if (!newArr.includes(answers[rand])) newArr.push(answers[rand]);
    }
    this.setState({ answers });
  }

  renderAnswers() {
    const { correct_answer: c, next, answers } = this.state;
    return answers.map((answer, idx) => {
      const checkColor = answer === c
        ? '3px solid rgb(6, 240, 15)'
        : '3px solid rgb(255, 0, 0)';

      const checkIsCorrect = answer === c ? 'correct-answer' : `wrong-answer-${idx}`;

      return (
        <button
          style={ { border: `${next ? checkColor : ''}` } }
          key={ answer }
          type="button"
          data-testid={ checkIsCorrect }
          onClick={ () => this.setState({ next: true }) }
        >
          {answer}
        </button>
      );
    });
  }

  render() {
    const { category, question } = this.state;
    return (
      <div>
        <h3 data-testid="question-category">{category}</h3>
        <h3 data-testid="question-text">{question}</h3>
        {this.renderAnswers()}
      </div>
    );
  }
}
export default Questions;
