import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Answers extends Component {
  render() {
    const { correct, incorrect } = this.props;
    const half = 0.5;
    // reference shuffle https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
    const allAnswers = [{ id: 'c', answer: correct }, ...incorrect
      .map((i, id) => ({ id, answer: i }))].sort(() => Math.random() - half);
    return (
      <div>
        { allAnswers.map(({ id, answer }) => (
          <p
            key={ id }
            data-testid={ id === 'c' ? 'correct-answer' : `wrong-answer-${id}` }
          >
            { answer }
          </p>
        )) }
      </div>
    );
  }
}

Answers.propTypes = {
  correct: PropTypes.string.isRequired,
  incorrect: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Answers;
