import React from 'react';
import PropTypes from 'prop-types';

export default function RenderWrong(props) {
  const { questions, count, num, correctAnswer } = props;

  return (
    <button
      id="errada"
      type="button"
      data-testid={ `wrong-answer-${num}` }
      onClick={ correctAnswer }
    >
      {questions[count].incorrect_answers[num]}
    </button>);
}

RenderWrong.propTypes = {
  questions: PropTypes.shape(PropTypes.string),
}.isRequired;
