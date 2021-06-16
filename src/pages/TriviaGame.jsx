import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Timer from '../components/Timer';
import { updateScore } from '../action';

const TEN = 10;
const difficultyScore = {
  hard: 3,
  medium: 2,
  easy: 1,
};

class TriviaGame extends Component {
  constructor() {
    super();
    this.state = {
      wasAnswered: false,
      isDisable: false,
    };
    this.showColoredBorders = this.showColoredBorders.bind(this);
    this.disableButtons = this.disableButtons.bind(this);
    this.sumScore = this.sumScore.bind(this);
  }

  showColoredBorders() {
    this.setState({ wasAnswered: true });
  }

  disableButtons() {
    this.setState({ isDisable: true });
  }

  sumScore(secs, diff) {
    const { uptadePlayerScore } = this.props;
    const getStorage = JSON.parse(localStorage.getItem('state'));
    const amountScore = getStorage.player.score;

    const currScore = amountScore + TEN + (secs * difficultyScore[diff]);
    const playerData = {
      player: {
        score: currScore,
      },
    };
    localStorage.setItem('state', JSON.stringify(playerData));
    uptadePlayerScore(currScore);
  }

  render() {
    const { questions, timeLeft } = this.props;
    const { wasAnswered } = this.state;
    let { isDisable } = this.state;

    const correctAnswer = wasAnswered && 'correct-answer';
    const wrongAnswer = wasAnswered && 'wrong-answer';
    isDisable = wasAnswered;
    return (
      <>
        <Header />
        <section>
          <p data-testid="question-category">
            {questions[0].category}
          </p>
          <p data-testid="question-text">
            {questions[0].question}
          </p>
          <button
            type="button"
            className={ correctAnswer }
            data-testid="correct-answer"
            disabled={ isDisable }
            onClick={ () => {
              this.showColoredBorders();
              this.sumScore(timeLeft, questions[0].difficulty);
            } }
          >
            {questions[0].correct_answer}
          </button>
          {questions[0].incorrect_answers.map((elem, index) => (
            <button
              type="button"
              className={ wrongAnswer }
              key={ index }
              disabled={ isDisable }
              data-testid={ `wrong-answer-${index}` }
              onClick={ () => this.showColoredBorders() }
            >
              {elem}
            </button>
          ))}
        </section>
        {!wasAnswered && <Timer disableButtons={ this.disableButtons } />}
        {wasAnswered && <button type="button" data-testid="btn-next">Próxima</button>}

      </>
    );
  }
}
const mapStateToProps = (state) => ({
  questions: state.player.questions,
  renderQuestions: state.player.renderQuestions,
  timeLeft: state.player.timeLeft,
});

const mapDispatchToProps = (dispatch) => ({
  uptadePlayerScore: (value) => dispatch(updateScore(value)),
});

TriviaGame.propTypes = {
  getAssertions: PropTypes.func,
  uptadePlayerScore: PropTypes.func,
  assertions: PropTypes.arryOf,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(TriviaGame);
