import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { isAnswered } from '../actions';
import '../pages/CSS/game.css';

class QuestionCard extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.options = this.options.bind(this);
    this.changeBtn = this.changeBtn.bind(this);
    this.state = {
      // score: 0,
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

  handleClick() {
    const { propIsAnswered, time } = this.props;
    propIsAnswered(true);
    console.log(time);
  }

  options(answered) {
    const { disabled } = this.state;
    const { question:
      { incorrect_answers: iAnswers, correct_answer: cAnswers } } = this.props;
    const answers = [...iAnswers, cAnswers];
    const changeClasse = (option) => (
      option !== cAnswers ? 'wrong-answer' : 'correct-answer');

    return answers.map((option, i) => (
      <button
        type="button"
        data-testid={ option !== cAnswers ? `wrong-answer-${i}` : 'correct-answer' }
        className={ answered ? changeClasse(option) : null }
        disabled={ disabled }
        onClick={ () => this.handleClick() }
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
});

QuestionCard.propTypes = {
  question: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);
