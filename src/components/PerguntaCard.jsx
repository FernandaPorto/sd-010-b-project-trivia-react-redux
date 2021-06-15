import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PerguntaCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correctAnswer: {},
      wrongAnswer: {},
    };
    this.checkAnswer = this.checkAnswer.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  // https://stackoverflow.com/questions/7394748/whats-the-right-way-to-decode-a-string-that-has-special-html-entities-in-it
  decodeHtml(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  handleNext() {
    const { nextQuestion } = this.props;
    this.setState((oldState) => ({
      ...oldState,
      correctAnswer: {},
      wrongAnswer: {},
    }));
    nextQuestion();
  }

  checkAnswer() {
    this.setState((oldState) => ({
      ...oldState,
      correctAnswer: { border: '3px solid rgb(6, 240, 15)' },
      wrongAnswer: { border: '3px solid rgb(255, 0, 0)' },
    }));
  }

  render() {
    const { question, options } = this.props;
    const { correctAnswer, wrongAnswer } = this.state;

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
}

PerguntaCard.propTypes = PropTypes.shape({
  question: PropTypes.instanceOf(Object),
  nextQuestion: PropTypes.func,
}).isRequired;
