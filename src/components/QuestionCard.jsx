import React from 'react';
import { PropTypes } from 'prop-types';
import '../pages/CSS/game.css';

class QuestionCard extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      score: 0,
    };
  }

  handleClick(e) {
    const button = e.target;
    if (button.className === 'correct-answer') {
      this.setState((prev) => ({ score: prev.score + 1 }));
    } else {
      // this.setState({ disabled: true });
    }
  }

  render() {
    const { question } = this.props;
    const wrongList = question.incorrect_answers.map((ans, i) => (
      <button
        type="button"
        className="wrong-answer"
        data-testid={ `wrong-answer-${i}` }
        onClick={ (e) => this.handleClick(e) }
        key={ i }
      >
        {ans}
      </button>));
    const optionsList = [
      <button
        type="button"
        className="correct-answer"
        data-testid="correct-answer"
        onClick={ (e) => this.handleClick(e) }
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
