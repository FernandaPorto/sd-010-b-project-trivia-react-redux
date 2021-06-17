import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import '../pages/CSS/game.css';
import { setNextQst, addScore } from '../actions';

class QuestionCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.nextBtnClick = this.nextBtnClick.bind(this);
    this.state = {
      difficulty: 1,
      time: 1,
      btnVisibility: 'none',
      wrongBorder: '',
      correctBorder: '',
      disabled: false,
    };
  }

  handleClick(e) {
    const button = e.target;
    const { saveScore } = this.props;
    const { difficulty, time } = this.state;
    if (button.className === 'correct-answer') {
      saveScore(1 * (difficulty * time));
    }
    this.setState({
      btnVisibility: 'block',
      wrongBorder: '3px solid rgb(255, 0, 0)',
      correctBorder: '3px solid rgb(6, 240, 15)',
      disabled: true,
    });
  }

  nextBtnClick() {
    const { nextQst } = this.props;
    nextQst();
    this.setState({
      btnVisibility: 'none',
      wrongBorder: '',
      correctBorder: '',
      disabled: false,
    });
  }

  render() {
    const { question } = this.props;
    const { btnVisibility, wrongBorder, correctBorder, disabled } = this.state;
    const wrongList = question.incorrect_answers.map((ans, i) => (
      <button
        type="button"
        className="wrong-answer"
        style={ { border: wrongBorder } }
        disabled={ disabled }
        data-testid={ `wrong-answer-${i}` }
        onClick={ (e) => this.handleClick(e) }
        key={ i }
      >
        {ans}
      </button>));
    const optionsList = [
      <button
        type="button"
        className="correct-answer"
        style={ { border: correctBorder } }
        disabled={ disabled }
        data-testid="correct-answer"
        onClick={ (e) => this.handleClick(e) }
        key="correct"
      >
        {question.correct_answer}
      </button>,
      ...wrongList,
    ];
    return (
      <div className="card-container">
        <h4 data-testid="question-category">{ question.category }</h4>
        <h3 data-testid="question-text">{ question.question }</h3>
        <div className="answer-options">{ optionsList }</div>
        <button
          type="button"
          className="next-btn"
          style={ { display: btnVisibility } }
          onClick={ () => this.nextBtnClick() }
          data-testid="btn-next"
        >
          Próximo
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  nextQst: () => dispatch(setNextQst()),
  saveScore: (score) => dispatch(addScore(score)),
});

QuestionCard.propTypes = {
  question: PropTypes.array,
  nextQst: PropTypes.func,
  saveScore: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(QuestionCard);
