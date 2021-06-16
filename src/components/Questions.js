import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getScore } from '../actions';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      next: false,
      answers: [],
      timer: 30,
    };
    this.randAnswers = this.randAnswers.bind(this);
    this.renderAnswers = this.renderAnswers.bind(this);
  }

  // REFERÊNCIA https://github.com/tryber/sd-10b-live-lectures/blob/lecture/13.1/cronometer/src/components/Cronometer.jsx

  componentDidMount() {
    const second = 1000;
    this.randAnswers();
    this.cronometerInterval = setInterval(() => {
      this.setState((state) => ({ timer: state.timer - 1 }));
    }, second);
  }

  componentDidUpdate(_, prev) {
    const clear = () => {
      this.setState({ timer: 0, next: true });
      clearInterval(this.cronometerInterval);
    };
    if (prev.timer === 0) clear();
  }

  randAnswers() {
    const { correct_answer: correct, incorrect_answers: incorrect } = this.state;
    const answers = [correct, ...incorrect];
    const newArr = [];
    while (newArr.length < answers.length) {
      const rand = Math.floor(Math.random() * answers.length);
      if (!newArr.includes(answers[rand])) newArr.push(answers[rand]);
    }
    this.setState({ answers: newArr });
  }

  calcAnswerValue() {
    const { difficulty, updateScore } = this.props;
    const { timer } = this.state;
    const CONSTANT = 10;
    const difficultyValues = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    const answerValue = CONSTANT + timer * difficultyValues[difficulty];

    updateScore(answerValue);

    const state = JSON.parse(localStorage.getItem('state'));
    state.player.score += answerValue;
    localStorage.setItem('state', JSON.stringify(state));
  }

  renderAnswers() {
    const { correct_answer: correct, next, answers, timer } = this.state;
    return answers.map((answer, idx) => {
      const checkColor = answer === correct
        ? '3px solid rgb(6, 240, 15)'
        : '3px solid rgb(255, 0, 0)';

      const checkIsCorrect = answer === correct
        ? 'correct-answer'
        : `wrong-answer-${idx}`;

      return (
        <button
          style={ { border: `${next || !timer ? checkColor : ''}` } }
          key={ answer }
          id={ checkIsCorrect }
          type="button"
          data-testid={ checkIsCorrect }
          onClick={ (event) => {
            if (!next) {
              this.setState({ next: true });
            }
            if (event.target.id === 'correct-answer') {
              this.calcAnswerValue();
            }
          } }
          disabled={ !timer }
        >
          {answer}
        </button>
      );
    });
  }

  render() {
    const { category, question, timer } = this.state;
    return (
      <div>
        <p>{ timer}</p>
        <h3 data-testid="question-category">{category}</h3>
        <h3 data-testid="question-text">{question}</h3>
        {this.renderAnswers()}
      </div>
    );
  }
}

Questions.propTypes = {
  difficulty: PropTypes.string.isRequired,
  updateScore: PropTypes.func.isRequired,
};

// const mapStateToProps = ({ user: { triviaGame } }) => ({
//   triviaGame,
// });

const mapDispatchToProps = (dispatch) => ({
  updateScore: (token) => dispatch(getScore(token)),
});

export default connect(null, mapDispatchToProps)(Questions);
