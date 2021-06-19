import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { playerScore } from '../actions';
import './Questions.css';

class Questions extends React.Component {
  constructor(props) {
    super(props);

    this.colorAnswer = this.colorAnswer.bind(this);
    this.createAnswers = this.createAnswers.bind(this);
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.state = { assertions: 0, score: 0 };
  }

  colorAnswer() {
    const correct = document.querySelector('.correct');
    const wrong = document.querySelectorAll('.wrong');

    correct.style.border = '3px solid rgb(6, 240, 15)';
    wrong.forEach((answer) => {
      answer.style.border = '3px solid rgb(255, 0, 0)';
    });
  }

  handleAnswerClick({ target: { className } }, stopTimer) {
    const { name, gravatarEmail, time, result: { difficulty }, addScore } = this.props;
    const { assertions, score } = this.state;
    const NUMBER_TEEN = 10;
    const level = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    this.colorAnswer();
    if (className === 'correct') {
      const point = NUMBER_TEEN + (time + level[difficulty]);
      const stats = {
        name,
        assertions: assertions + 1,
        score: point + score,
        gravatarEmail,
      };
      const state = { player: stats };
      console.log(stats);
      localStorage.setItem('state', JSON.stringify(state));
      this.setState({ score: point + score, assertions: assertions + 1 });
      addScore(stats);
    }

    stopTimer();
  }

  createAnswers({ quest, index, correctAnswer, disabled, stopTimer }) {
    if (quest === correctAnswer) {
      return (
        <button
          key={ index }
          type="button"
          onClick={ (props) => this.handleAnswerClick(props, stopTimer) }
          data-testid="correct-answer"
          className="correct"
          disabled={ disabled }
        >
          { quest }
        </button>
      );
    }
    if (disabled) {
      this.colorAnswer();
    }
    return (
      <button
        key={ index }
        type="button"
        onClick={ (props) => this.handleAnswerClick(props, stopTimer) }
        data-testid={ `wrong-answer-${index}` }
        className="wrong"
        disabled={ disabled }
      >
        { quest }
      </button>
    );
  }

  render() {
    const { result:
       { category,
         question,
         correct_answer: correctAnswer,
         incorrect_answers: incorrectAnswers,
       },
    disabled,
    stopTimer,
    order,
    } = this.props;
    if (correctAnswer) {
      let allQuestions = [correctAnswer, ...incorrectAnswers];
      allQuestions = order.map((value) => allQuestions[value]);
      return (
        <div className="questions">
          <h2 data-testid="question-category" className="question--category">
            {category}
          </h2>
          <div data-testid="question-text" className="question--text">
            {question}
          </div>
          <div
            role="link"
            className="answers"
          >
            { allQuestions.map((quest, index) => {
              const info = {
                quest,
                index,
                correctAnswer,
                disabled,
                stopTimer,
              };
              return this.createAnswers(info);
            }) }
          </div>
        </div>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  addScore: (stats) => dispatch(playerScore(stats)),
});

Questions.propTypes = {
  result: PropTypes.shape({
    category: PropTypes.string,
  }),
  disabled: PropTypes.bool,
  stopTimer: PropTypes.func,
}.isRequired;

Questions.default = {
  result: undefined,
};

export default connect(null, mapDispatchToProps)(Questions);
