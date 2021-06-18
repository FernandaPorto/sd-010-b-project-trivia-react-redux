import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { isAnswered } from '../actions';
import '../pages/CSS/game.css';

class QuestionCard extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.changeBtn = this.changeBtn.bind(this);
    this.state = {
      score: 0,
      disabled: false,
    };
  }

  componentDidUpdate(prev) {
    const { answered } = this.props;
    if (prev.answered === false && answered === true) this.changeBtn(true);
    if (prev.answered === true && answered === false) this.changeBtn(false);
  }

  changeBtn(disabled) {
    this.setState({ disabled });
  }

  handleClick({ target }) {
    const { propIsAnswered } = this.props;
    propIsAnswered(true);
    const button = target;
    const wrongs = document.querySelectorAll('.wrong-answer');
    const correct = document.getElementsByClassName('correct-answer');
    if (button.className === 'correct-answer') {
      this.setState((prev) => ({ score: prev.score + 1 }));
    }
    wrongs.forEach((item) => {
      item.style.border = '3px solid rgb(255, 0, 0)';
    });
    correct[0].style.border = '3px solid rgb(6, 240, 15)';
  }

  render() {
    const { question } = this.props;
    const { disabled } = this.state;
    const wrongList = question.incorrect_answers.map((ans, i) => (
      <button
        type="button"
        className="wrong-answer"
        data-testid={ `wrong-answer-${i}` }
        disabled={ disabled }
        onClick={ (e) => this.handleClick(e) }
        key={ i }
      >
        {ans}
      </button>));
    const optionsList = [
      <button
        type="button"
        className="correct-answer"
        data-testid="correct-answer"
        disabled={ disabled }
        onClick={ (e) => this.handleClick(e) }
        key="correct"
      >
        {question.correct_answer}
      </button>,
      ...wrongList,
    ];
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
