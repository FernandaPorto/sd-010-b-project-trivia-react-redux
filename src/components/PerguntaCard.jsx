import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Timer from './Timer';

export default class PerguntaCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correctAnswer: {},
      wrongAnswer: {},
      timer: 30,
    };
    this.checkAnswer = this.checkAnswer.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.setTimer = this.setTimer.bind(this);
  }

  setTimer() {
    const ONE_SECOND = 1000;
    this.timer = setInterval(() => {
      this.setState((oldState) => ({
        ...oldState,
        timer: oldState.timer - 1,
      }));
    }, ONE_SECOND);
  }

  handleNext() {
    const { nextQuestion } = this.props;
    this.setState((oldState) => ({
      ...oldState,
      correctAnswer: {},
      wrongAnswer: {},
      timer: 30,
    }));
    nextQuestion();
    this.setTimer();
  }

  checkAnswer() {
    this.setState((oldState) => ({
      ...oldState,
      correctAnswer: { border: '3px solid rgb(6, 240, 15)' },
      wrongAnswer: { border: '3px solid rgb(255, 0, 0)' },
    }));
    clearInterval(this.timer);
  }

  decodeHtml(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  renderTimer() {
    const { timer } = this.state;
    if (timer === 0) {
      clearInterval(this.timer);
    }
    return (<Timer
      timer={ timer }
      setTimer={ this.setTimer }
    />);
  }

  renderQuestion() {
    const { question, options } = this.props;
    const { correctAnswer, wrongAnswer, timer } = this.state;
    const disab = timer === 0;
    return (
      <>
        <blockquote data-testid="question-category">{question.category}</blockquote>
        <h4 data-testid="question-text">{this.decodeHtml(question.question)}</h4>
        <ul>
          {
            // https://flaviocopes.com/how-to-shuffle-array-javascript/
            options.map((opt) => (
              <li key={ opt }>
                <button
                  style={ opt === question.correct_answer ? correctAnswer : wrongAnswer }
                  type="button"
                  data-testid={
                    opt === question.correct_answer
                      ? 'correct-answer'
                      : `wrong-answer-${options.indexOf(opt)}`
                  }
                  onClick={ this.checkAnswer }
                  className="optionsButtons"
                  disabled={ disab }
                >
                  {this.decodeHtml(opt)}

                </button>
              </li>))
          }
        </ul>
        <button type="button" onClick={ this.handleNext }>Proxima pergunta</button>
      </>
    );
  }

  render() {
    return (
      <>
        {this.renderQuestion()}
        {this.renderTimer()}
      </>
    );
  }
}

PerguntaCard.propTypes = PropTypes.shape({
  question: PropTypes.instanceOf(Object),
  nextQuestion: PropTypes.func,
}).isRequired;

// https://stackoverflow.com/questions/7394748/whats-the-right-way-to-decode-a-string-that-has-special-html-entities-in-it
