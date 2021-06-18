/* eslint-disable no-nested-ternary */
/* eslint-disable max-lines-per-function */
/* eslint-disable react/no-multi-comp */
import React from 'react';

const half = 0.5;
const Questionaire = ({
  isDisable, colorRed, colorGreen, handleNextQuestion, showAnswers, handleAnswer, data: { category, question, correct_answer, incorrect_answers },
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
            disabled={ isDisable }
            type="button"
            data-testid={ correct_answer === answer
              ? 'correct-answer' : `wrong-answer-${index}` }
            // className={ `${
            //   correct_answer === answer
            //     ? 'green-border'
            //     : 'red-border'
            // } `}
            onClick={ () =>  handleAnswer(answer)  }
            style={{border: 
              `${correct_answer === answer
                ? colorGreen
                : colorRed}`}}
          >
            { answer }
          </button>
        ))}
        <div>
          {showAnswers && (
          <button 
            data-testid="btn-next"
            onClick={handleNextQuestion}
            type="button"
          >
            Próxima
          </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Questionaire;
