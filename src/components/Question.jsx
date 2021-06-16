import React from 'react';
import PropTypes from 'prop-types';

class Question extends React.Component {
  render() {
    const { result } = this.props;
    const arrAnswers = [result.correct_answer, ...result.incorrect_answers];
    const half = 0.5;
    const shuffleArray = (array) => array.sort(() => Math.random() - half);
    const arrRandom = shuffleArray(arrAnswers);
    // let count = null;
    const check = (answer, index) => {
      if (answer === result.correct_answer) {
        // count = index;
        return 'correct-answer';
      }
      return `wrong-answer-${index}`;
      // return `wrong-answer-${count === null ? index : (index < count ? index : index - 1)}`;
    };
    return (
      <>
        <span data-testid="question-category">
          { `Category: 
          ${result.category}`}
        </span>

        <br />

        <span data-testid="question-text">
          { `Question:  
          ${result.question}`}
        </span>

        <br />

        { arrRandom.map((answer, index = 0) => (
          <button
            type="button"
            key={ answer }
            data-testid={ check(answer, index) }
          >
            { answer }
          </button>
        ))}

      </>
    );
  }
}

Question.propTypes = {
  result: PropTypes.arrayOf().isRequired,
};

export default Question;
