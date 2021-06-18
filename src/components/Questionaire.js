import React from 'react';
import PropTypes from 'prop-types';

const half = 0.5;
const Questionaire = ({
  isDisable,
  colorRed,
  colorGreen,
  handleNextQuestion,
  handleAssertions, showAnswers, handleAnswer, data: { category, question,
    correct_answer: correctAnswer, incorrect_answers: incorrectAnswers },
}) => {
  const mixedAnswers = [correctAnswer,
    ...incorrectAnswers].sort(() => Math.random() - half);
  return (
    <div>
      <p data-testid="question-category">{ category }</p>
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
            data-testid={ correctAnswer === answer
              ? 'correct-answer' : `wrong-answer-${index}` }
            onClick={ () => { handleAnswer(answer); handleAssertions(); } }
            style={ { border:
              `${correctAnswer === answer
                ? colorGreen : colorRed}` } }
          >
            { answer }
          </button>
        ))}
        <div>
          {showAnswers && (
            <button
              data-testid="btn-next"
              onClick={ handleNextQuestion }
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

Questionaire.propTypes = {
  data: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  handleAnswer: PropTypes.func.isRequired,
  isDisable: PropTypes.bool.isRequired,
  colorRed: PropTypes.string.isRequired,
  colorGreen: PropTypes.string.isRequired,
  handleNextQuestion: PropTypes.func.isRequired,
  handleAssertions: PropTypes.func.isRequired,
  showAnswers: PropTypes.func.isRequired,
};

export default Questionaire;
