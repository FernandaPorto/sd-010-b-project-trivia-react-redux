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
    };

    this.showCorrectAnswers = this.showCorrectAnswers.bind(this);
    this.handleClick = this.handleClick.bind(this);
    // this.handleButtonNext = this.handleButtonNext.bind(this);
  }

  showCorrectAnswers() {
    this.setState({
      youreRight: 'right-answer',
      youreWrong: 'wrong-answer',
      isNext: true,
    });
  }

  // handleButtonNext() {
  //   return (
  //     <button type="button" data-testid="btn-next">Próxima</button>
  //   );
  // }

  handleClick() {
    this.showCorrectAnswers();
    // this.handleButtonNext();
  }

  render() {
    const { youreRight, youreWrong, isNext } = this.state;
    const { correct, incorrect } = this.props;
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
            onClick={ this.handleClick }
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
};

export default Answers;
