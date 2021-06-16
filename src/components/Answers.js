import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './answersColors.css';

class Answers extends Component {
  constructor() {
    super();

    this.state = {
      youreRight: '',
      youreWrong: '',
    };

    this.showCorrectAnswers = this.showCorrectAnswers.bind(this);
  }

  showCorrectAnswers() {
    this.setState({
      youreRight: 'right-answer',
      youreWrong: 'wrong-answer',
    });
  }

  render() {
    const { youreRight, youreWrong } = this.state;
    const { correct, incorrect, isDisableAnswers } = this.props;
    if (isDisableAnswers) {
      this.showCorrectAnswers();
    }
    const half = 0.5;
    // reference shuffle https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
    const allAnswers = [{ id: 'c', answer: correct }, ...incorrect
      .map((i, id) => ({ id, answer: i }))].sort(() => Math.random() - half);
    return (
      <div>
        { allAnswers.map(({ id, answer }) => (
          <button
            key={ id }
            data-testid={ id === 'c' ? 'correct-answer' : `wrong-answer-${id}` }
            type="button"
            className={ id === 'c' ? youreRight : youreWrong }
            onClick={ this.showCorrectAnswers }
            disabled={ isDisableAnswers }
          >
            { answer }
          </button>
        )) }
      </div>
    );
  }
}

Answers.propTypes = {
  correct: PropTypes.string.isRequired,
  incorrect: PropTypes.arrayOf(PropTypes.string).isRequired,
  isDisableAnswers: PropTypes.bool.isRequired,
};

export default Answers;
