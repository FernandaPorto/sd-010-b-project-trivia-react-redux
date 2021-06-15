import React from 'react';
import PropTypes from 'prop-types';

class Questions extends React.Component {
  render() {
    const { result:
       { category,
         question,
         correct_answer: correctAnswer,
         incorrect_answers: incorrectAnswers,
       },
    } = this.props;
    return (
      <>
        <h2 data-testid="question-category">
          {category}
        </h2>
        <div data-testid="question-text">
          {question}
        </div>
        <div data-testid="correct-answer">
          {correctAnswer}
        </div>
        <div data-testid={ `wrong-answer${0}` }>
          {incorrectAnswers[0]}
        </div>
        <div data-testid={ `wrong-answer${1}` }>
          {incorrectAnswers[1]}
        </div>
        <div data-testid={ `wrong-answer${2}` }>
          {incorrectAnswers[2]}
        </div>
      </>
    );
  }
}
Questions.propTypes = {
  result: PropTypes.shape({
    category: PropTypes.string,
  }),
}.isRequired;

Questions.default = {
  result: undefined,
};

export default Questions;
