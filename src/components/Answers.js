import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './answersColors.css';

class Answers extends Component {
  constructor() {
    super();

    this.state = {
      youreRight: '',
      youreWrong: '',
      isNext: false,
      shuffleAnswers: [],
    };

    this.showCorrectAnswers = this.showCorrectAnswers.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  showCorrectAnswers() {
    const { funcDisable } = this.props;
    this.setState({
      youreRight: 'right-answer',
      youreWrong: 'wrong-answer',
      isNext: true,
    }, funcDisable());
  }

  handleClick() {
    this.showCorrectAnswers();
  }

  render() {
    const { youreRight, youreWrong, isNext, shuffleAnswers } = this.state;
    const { correct, incorrect, isDisableAnswers } = this.props;
    if (isDisableAnswers
      && (youreRight !== 'right-answer' && youreWrong !== 'wrong-answer')) {
      this.showCorrectAnswers();
    }
    if (shuffleAnswers.length === 0) {
      const half = 0.5;
      // reference shuffle https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
      const allAnswers = [{ id: 'c', answer: correct }, ...incorrect
        .map((i, id) => ({ id, answer: i }))].sort(() => Math.random() - half);
      this.setState({ shuffleAnswers: allAnswers });
    }
    return (
      <div>
        { shuffleAnswers.map(({ id, answer }) => (
          <button
            key={ id }
            data-testid={ id === 'c' ? 'correct-answer' : `wrong-answer-${id}` }
            type="button"
            className={ id === 'c' ? youreRight : youreWrong }
            onClick={ this.handleClick }
            disabled={ isDisableAnswers }
          >
            { answer }
          </button>
        )) }
        { isNext === true ? <button type="button" data-testid="btn-next">Próxima</button>
          : null }
      </div>
    );
  }
}

Answers.propTypes = {
  correct: PropTypes.string.isRequired,
  incorrect: PropTypes.arrayOf(PropTypes.string).isRequired,
  isDisableAnswers: PropTypes.bool.isRequired,
  funcDisable: PropTypes.func.isRequired,
};

export default Answers;
