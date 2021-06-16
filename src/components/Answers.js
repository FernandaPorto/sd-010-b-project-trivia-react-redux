import React, { Component } from 'react';
import PropTypes from 'prop-types';

const difficultyObj = { hard: 3, medium: 2, easy: 1 };

const storageInicial = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  ranking: [],
};

class Answers extends Component {
  constructor(props) {
    super(props);
    const { difficulty } = this.props;
    this.state = {
      timer: 10,
      difficulty,
    };
    this.selectAnswer = this.selectAnswer.bind(this);
    this.addScore = this.addScore.bind(this);
  }

  addScore(timer, difficulty) {
    const DEZ = 10;
    const Storage = JSON.parse(localStorage.getItem('state'));
    const state = !Storage ? storageInicial : Storage;
    const pointToAdd = DEZ + (difficultyObj[difficulty] * timer);
    state.score += pointToAdd;
    localStorage.setItem('state', JSON.stringify(state));
  }

  selectAnswer(timer, difficulty, id) {
    // if (id === 'c') addScore(timer, difficulty);
    this.addScore(timer, difficulty);
  }

  render() {
    const { correct, incorrect } = this.props;
    const { timer, difficulty } = this.state;
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
            onClick={ () => this.selectAnswer(timer, difficulty, id) }
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
  difficulty: PropTypes.string.isRequired,
  incorrect: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Answers;
