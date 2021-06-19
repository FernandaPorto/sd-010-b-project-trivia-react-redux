import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { isAnswered, setPlayerScore } from '../actions';
import '../pages/CSS/game.css';

class QuestionCard extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.options = this.options.bind(this);
    this.changeBtn = this.changeBtn.bind(this);
    this.state = {
      disabled: false,
    };
  }

  componentDidUpdate(prev) {
    const { answered } = this.props;
    if (!prev.answered && answered) this.changeBtn(true);
    if (prev.answered && !answered) this.changeBtn(false);
  }

  changeBtn(disabled) {
    this.setState({ disabled });
  }

  handleClick(dif, correct) {
    const { propIsAnswered, propSetPlayerScore, time } = this.props;
    propIsAnswered(true);
    if (correct) {
      const mult = { hard: 3, medium: 2, easy: 1 };
      const acc = 10;
      propSetPlayerScore({ score: acc + (time * mult[dif]),
        assertions: 1 });
    }
  }

  options(answered) {
    const { disabled } = this.state;
    const correct = 'correct-answer';
    const { question:
      { difficulty, incorrect_answers: iAnswers, correct_answer: cAnswers },
    } = this.props;
    const answers = [...iAnswers, cAnswers];
    const changeClasse = (option) => (
      option !== cAnswers ? 'wrong-answer' : correct);

    return answers.map((option, i) => (
      <button
        type="button"
        data-testid={ option !== cAnswers ? `wrong-answer-${i}` : correct }
        className={ answered ? changeClasse(option) : null }
        disabled={ disabled }
        onClick={ () => this.handleClick(difficulty, option === cAnswers) }
        key={ i }
      >
        { option }
      </button>
    ));
  }

  render() {
    const { question, answered } = this.props;
    const optionsList = this.options(answered);
    return (
      <div className="card-container">
        <h4 data-testid="question-category">
          { question.category }
        </h4>
        <h3 data-testid="question-text">
          { question.question }
        </h3>
        <div className="answer-options">
          { optionsList }
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
  propSetPlayerScore: (payload) => dispatch(setPlayerScore(payload)),
});

QuestionCard.propTypes = {
  question: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);
