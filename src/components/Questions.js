import React, { Component } from 'react';
import Cronometro from './Cronometro';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props, next: false, isValid: false };
    this.randAnswers = this.randAnswers.bind(this);
    this.listenerChange = this.listenerChange.bind(this);
  }

  randAnswers() {
    const { correct_answer: c, incorrect_answers: i } = this.state;
    const inc = [...i];
    const rand = Math.floor(Math.random() * ((inc.length - 1) + 1));
    const swap = inc[rand];
    inc.splice(rand, 0);
    inc[rand] = c;
    return [...inc, swap];
  }

  listenerChange() {
    this.setState({ isValid: true });
  }

  render() {
    const { correct_answer: c, category, question, isValid, next } = this.state;
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
              disabled={ isValid }
              onClick={ () => this.setState({ next: true }) }
            >
              {answer}
            </button>
          );
        })}
        <Cronometro funcao={ this.listenerChange } />
      </div>
    );
  }
}
export default Questions;
