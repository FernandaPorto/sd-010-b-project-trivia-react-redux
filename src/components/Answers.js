import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import scoreAction from '../actions/scoreAction';

import './answersColors.css';

const difficultyObj = { hard: 3, medium: 2, easy: 1 };

class Answers extends Component {
  constructor(props) {
    super(props);
    const { difficulty } = this.props;
    this.state = {
      difficulty,
      youreRight: '',
      youreWrong: '',
      isNext: false,
      shuffleAnswers: [],
    };
    this.showCorrectAnswers = this.showCorrectAnswers.bind(this);
    this.selectAnswer = this.selectAnswer.bind(this);
    this.addScore = this.addScore.bind(this);
    this.storageInicial = this.storageInicial.bind(this);
  }

  storageInicial() {
    return {
      player: {
        name: '',
        assertions: 0,
        score: 0,
        gravatarEmail: '',
      },
      ranking: [],
      token: '',
    };
  }

  addScore(timer, difficulty) {
    const { name, email, updateScore } = this.props;
    const DEZ = 10;
    const Storage = JSON.parse(localStorage.getItem('state'));
    const state = !Storage ? this.storageInicial() : Storage;
    const pointToAdd = DEZ + (difficultyObj[difficulty] * timer);
    state.player.name = name;
    state.player.gravatarEmail = email;
    state.player.score += pointToAdd;
    state.player.assertions += 1;
    localStorage.setItem('state', JSON.stringify(state));
    updateScore(pointToAdd);
  }

  selectAnswer(timer, difficulty, id) {
    if (id === 'c') this.addScore(timer, difficulty);
    this.showCorrectAnswers();
  }

  showCorrectAnswers() {
    const { funcDisable } = this.props;
    this.setState({
      youreRight: 'right-answer',
      youreWrong: 'wrong-answer',
      isNext: true,
    }, funcDisable());
  }

  render() {
    const { youreRight, youreWrong, shuffleAnswers, difficulty, isNext } = this.state;
    const { correct, incorrect, isDisableAnswers, timer } = this.props;
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
            onClick={ () => this.selectAnswer(timer, difficulty, id) }
            disabled={ isDisableAnswers }
          >
            { answer }
          </button>
        )) }
        { isNext && <button type="button" data-testid="btn-next">Próxima</button> }
      </div>
    );
  }
}

Answers.propTypes = {
  correct: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  updateScore: PropTypes.func.isRequired,
  funcDisable: PropTypes.func.isRequired,
  isDisableAnswers: PropTypes.bool.isRequired,
  timer: PropTypes.number.isRequired,
  incorrect: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  name: state.triviaGame.name,
  email: state.triviaGame.email,
});

const mapDispatchToProps = (dispatch) => ({
  updateScore: (score) => dispatch(scoreAction(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Answers);
