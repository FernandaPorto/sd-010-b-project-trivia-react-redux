import React, { Component } from 'react';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props, next: false };
    this.randAnswers = this.randAnswers.bind(this);
  }

  randAnswers() {
    const { correct_answer: c, incorrect_answers: i } = this.state;
    const inc = [...i];
    const rand = Math.floor(Math.random() * (inc.length - 1 + 1));
    const swap = inc[rand];
    inc.splice(rand, 1);
    inc[rand] = c;
    return [...inc, swap];
  }

  render() {
    const { correct_answer: c, category, question, next } = this.state;
    console.log(this.state);
    return (
      <div>
        <h3 data-testid="question-category">{category}</h3>
        <h3 data-testid="question-text">{question}</h3>
        {this.randAnswers().map((answer, idx) => {
          const checkColor = answer === c ? '3px solid rgb(6, 240, 15)'
            : '3px solid rgb(255, 0, 0)';
          const test = answer === c ? 'correct-answer' : `wrong-answer-${idx}`;
          const dataTestId = { 'data-testid': test };
          return (
            <button
              style={ { border: `${next ? checkColor : ''}` } }
              key={ answer }
              type="button"
              { ...dataTestId }
              onClick={ () => this.setState({ next: true }) }
            >
              {answer}
            </button>
          );
        })}
      </div>
    );
  }
}
export default Questions;
