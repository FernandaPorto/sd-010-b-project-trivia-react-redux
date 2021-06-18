import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import '../App.css';

const half = 0.5;
const Questionaire = ({
  handleAssertions,
  handleAnswer, data: {
    category,
    question,
    correct_answer: correctAnswer,
    incorrect_answers: incorrectAnswer,
  },
}) => {
  const mixedAnswers = [correctAnswer,
    ...incorrectAnswer].sort(() => Math.random() - half);
  return (
    <div>
      <p
        data-testid="question-category"
      >
        { category }
      </p>
      <div className="bg-white">
        <h2
          data-testid="question-text"
          dangerouslySetInnerHTML={ { __html: question } }
        />
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        {mixedAnswers.map((answer, index) => (
          <button
            className="answerBtn"
            key={ index }
            type="button"
            data-testid={ correctAnswer === answer
              ? 'correct-answer' : `wrong-answer-${index}` }
            onClick={ () => { handleAnswer(answer); handleAssertions(); } }
          >
            { answer }
          </button>
        ))}
      </div>
    </div>
  );
};

Questionaire.propTypes = {
  data: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  handleAnswer: PropTypes.func.isRequired,
};

export default Questionaire;
