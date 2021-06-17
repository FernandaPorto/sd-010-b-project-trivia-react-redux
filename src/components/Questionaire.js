/* eslint-disable max-lines-per-function */
/* eslint-disable react/no-multi-comp */
import React from 'react';

// const Button = ({ answer, className }) => (
//   <button
//     type="button"
//     className={ `bg-white p-4 text-purple-800
//     font-semibold rounded shadow ${className}` }>
//     {answer}
//   </button>
// );
const half = 0.5;
const Questionaire = ({
  handleAnswer, data: { category, question, correct_answer, incorrect_answers },
}) => {
  const mixedAnswers = [correct_answer,
    ...incorrect_answers].sort(() => Math.random() - half);
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
            key={ index }
            type="button"
            data-testid={ correct_answer === answer
              ? 'correct-answer' : `wrong-answer-${index}` }
            className={ `${
              correct_answer === answer
                ? 'bg-purple-300'
                : 'bg-white'
            } p-4 text-purpe-800
          font-semibold rounded shadow` }
            onClick={ () => handleAnswer(answer) }
          >
            { answer }
          </button>

        ))}

      </div>
    </div>
  );
};

export default Questionaire;
