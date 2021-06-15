import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PerguntaCard extends Component {
  // https://stackoverflow.com/questions/7394748/whats-the-right-way-to-decode-a-string-that-has-special-html-entities-in-it
  decodeHtml(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  render() {
    const { question, nextQuestion } = this.props;
    const options = [...question.incorrect_answers, question.correct_answer];
    const dotFive = 0.5;
    return (
      <>
        <blockquote data-testid="question-category">{question.category}</blockquote>
        <h4 data-testid="question-text">{this.decodeHtml(question.question)}</h4>
        <ul>
          {
            // https://flaviocopes.com/how-to-shuffle-array-javascript/
            options.sort(() => Math.random() - dotFive)
              .map((opt) => (
                <li key={ opt }>
                  <button
                    type="button"
                    data-testid={
                      opt === question.correct_answer
                        ? 'correct-answer'
                        : `wrong-answer-${options.indexOf(opt)}`
                    }
                  >
                    {opt}

                  </button>
                </li>))
          }

        </ul>
        <button type="button" onClick={ nextQuestion }>Proxima pergunta</button>
      </>
    );
  }
}

PerguntaCard.propTypes = PropTypes.shape({
  question: PropTypes.instanceOf(Object),
  nextQuestion: PropTypes.func,
}).isRequired;
