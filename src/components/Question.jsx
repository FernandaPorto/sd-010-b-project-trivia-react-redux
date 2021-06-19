import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveNumQuestion } from '../actions/index';
import './styleQuestion.css';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      arrRandom: [],
      fullResults: {},
      numQuestion: 0,
    };

    this.handleResult = this.handleResult.bind(this);
    this.insertDataTestId = this.insertDataTestId.bind(this);
    this.insertClass = this.insertClass.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  componentDidMount() {
    this.handleResult();
  }

  handleResult() {
    const { result } = this.props;
    const arrAnswers = [result.correct_answer, ...result.incorrect_answers];
    const half = 0.5;
    const shuffleArray = (array) => array.sort(() => Math.random() - half); // ref: https://flaviocopes.com/how-to-shuffle-array-javascript/
    this.setState({
      arrRandom: shuffleArray(arrAnswers),
      fullResults: result,
    });
  }

  insertDataTestId(answer, index) {
    const { result } = this.props;
    if (answer === result.correct_answer) {
      return 'correct-answer';
    }
    return `wrong-answer-${index}`;
  }

  insertClass(event) {
    const { result } = this.props;
    if (event.target.value === result.correct_answer) {
      event.target.className = 'correctButton';
    } else {
      event.target.className = 'wrongButton';
    }
  }

  checkAnswer(answer) {
    const { result, timer } = this.props;
    const ten = 10;
    const points = { hard: 3, medium: 2, easy: 1 };
    const state = JSON.parse(localStorage.getItem('state'));
    if (answer === result.correct_answer) {
      const diff = result.difficulty;
      const score = ten + (timer * points[diff]);
      state.player.score += score;
      return localStorage.setItem('state', JSON.stringify(state));
    }
  }

  handleChange() {
    this.setState({ isClicked: true });
  }

  clicked(answer) {
    const { fullResults, isClicked } = this.state;
    if (isClicked && answer === fullResults.correct_answer) {
      return 'correctButton';
    }
    if (isClicked && fullResults.incorrect_answers.includes(answer)) {
      return 'wrongButton';
    }
    return null;
  }

  add1ToNQ() {
    this.setState((oldState) => ({ numQuestion: oldState.numQuestion + 1 }));
  }

  render() {
    const { props: { result, disabled, saveNumQ },
      state: { arrRandom, isClicked, numQuestion } } = this;
    return (
      <>
        <span data-testid="question-category">
          {`Category: 
          ${result.category}`}
        </span>

        <br />

        <span data-testid="question-text">
          {`Question:  
          ${result.question}`}
        </span>

        <br />

        {arrRandom.map((answer, index) => (
          <button
            type="button"
            key={ answer }
            value={ answer }
            data-testid={ this.insertDataTestId(answer, index) }
            onClick={ () => { this.handleChange(); this.checkAnswer(answer); } }
            className={ this.clicked(answer) }
            disabled={ disabled }
          >
            { answer }
          </button>
        ))}

        { isClicked
        && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ () => { this.add1ToNQ(); saveNumQ(numQuestion); } }
          >
            Próxima
          </button>) }
      </>
    );
  }
}

Question.propTypes = {
  result: PropTypes.arrayOf().isRequired,
  disabled: PropTypes.bool.isRequired,
  timer: PropTypes.number.isRequired,
  saveNumQ: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveNumQ: (numQuestion) => dispatch(saveNumQuestion(numQuestion)),
});

export default connect(null, mapDispatchToProps)(Question);
