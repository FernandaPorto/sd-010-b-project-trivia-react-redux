import React from 'react';
import { PropTypes } from 'prop-types';
import '../pages/CSS/game.css';

class QuestionCard extends React.Component {
  render() {
    const { question } = this.props;
    const wrongList = question.incorrect_answers.map((ans, i) => (
      <button
        type="button"
        data-testid={ `wrong-answer-${i}` }
        key={ i }
      >
        {ans}
      </button>));
    const optionsList = [
      <button
        type="button"
        data-testid="correct-answer"
        key="correct"
      >
        {question.correct_answer}
      </button>,
      ...wrongList,
    ];
    return (
      <div className="card-container">
        <h4 data-testid="question-category">
          { question.category }
        </h4>
        <h3 data-testid="question-text">
          { question.question }
        </h3>
        <div className="answer-options">
          { optionsList }
        </div>
      </div>
    );
  }
}

QuestionCard.propTypes = {
  question: PropTypes.array,
}.isRequired;

export default QuestionCard;
