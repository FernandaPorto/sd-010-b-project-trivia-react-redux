import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { isAnswered } from '../actions';
import '../pages/CSS/game.css';

class QuestionCard extends React.Component {
  constructor() {
    super();
    this.fetchAnswers = this.fetchAnswers.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.options = this.options.bind(this);
    this.changeBtn = this.changeBtn.bind(this);
    this.state = {
      disabled: false,
      answers: null,
    };
  }

  componentDidMount() {
    this.fetchAnswers();
  }

  componentDidUpdate(prev) {
    const { answered, question } = this.props;
    if (!prev.answered && answered) this.changeBtn(true);
    if (prev.answered && !answered) this.changeBtn(false);
    if (prev.question.correct_answer !== question.correct_answer) this.fetchAnswers();
  }

  componentWillUnmount() {
    const { propIsAnswered } = this.props;
    propIsAnswered(false);
    this.setState({ answers: null });
  }

  changeBtn(disabled) {
    this.setState({ disabled });
  }

  handleClick(correct) {
    const { propIsAnswered, question: { difficulty }, time } = this.props;
    propIsAnswered(true);
    if (correct === 'correct-answer') {
      const mult = { hard: 3, medium: 2, easy: 1 };
      const acc = 10;
      const { player } = JSON.parse(localStorage.getItem('state'));
      localStorage.setItem('state', JSON.stringify({
        player: {
          ...player,
          assertions: player.assertions + 1,
          score: player.score + acc + (time * mult[difficulty]) } }));
    }
  }

  fetchAnswers() {
    const { question:
      { incorrect_answers: iAnswers, correct_answer: cAnswers },
    } = this.props;
    const ten = 10;
    const obj = { [cAnswers]: 'correct-answer' };
    iAnswers.forEach((opt, i) => { obj[opt] = `wrong-answer-${i}`; });
    const answers = Object.entries(obj)
      .sort(() => 2 - Math.floor(Math.random() * ten));
    this.setState({ answers });
  }

  options(answers) {
    const { disabled } = this.state;
    const { answered } = this.props;
    return answers.map((option, i) => (
      <button
        type="button"
        data-testid={ option[1] }
        className={ answered ? `${option[1].split('answer')[0]}answer` : null }
        disabled={ disabled }
        onClick={ () => this.handleClick(option[1]) }
        key={ i }
      >
        { option[0] }
      </button>
    ));
  }

  render() {
    const { question } = this.props;
    const { answers } = this.state;
    return (
      <div className="card-container">
        <h4 data-testid="question-category">
          { question.category }
        </h4>
        <h3 data-testid="question-text">
          { question.question }
        </h3>
        <div className="answer-options">
          { answers && this.options(answers) }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ timerReducer: { time, answered } }) => ({
  time, answered,
});

const mapDispatchToProps = (dispatch) => ({
  propIsAnswered: (payload) => dispatch(isAnswered(payload)),
});

QuestionCard.propTypes = {
  question: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);
