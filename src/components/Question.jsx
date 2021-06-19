import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveNumQuestion } from '../actions/index';
import './styleQuestion.css';
import history from '../history';

class Question extends React.Component {
  constructor(props) {
    super(props);
    const { numQuestion } = this.props;
    this.state = {
      isClicked: false,
      arrRandom: [],
      fullResults: {},
      numQuestion,
      timer: 30,
      isDisabled: false,
      updateT: '',
    };

    this.handleResult = this.handleResult.bind(this);
    this.insertDataTestId = this.insertDataTestId.bind(this);
    this.insertClass = this.insertClass.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  componentDidMount() {
    this.handleResult();
    this.updateTimer();
  }

  updateTimer() {
    const oneSec = 1000;
    const reduceTimer = () => {
      const { state: { timer } } = this;
      if (timer > 0) {
        this.setState((oldState) => ({ timer: oldState.timer - 1 }));
      } if (timer === 0) {
        this.setState({ isDisabled: true });
      }
    };
    // setInterval(reduceTimer, oneSec);
    this.setState({ updateT: setInterval(reduceTimer, oneSec) });
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
    const { result } = this.props;
    const { timer } = this.state;
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
    const { saveNumQ } = this.props;
    const { updateT } = this.state;
    this.setState((oldState) => ({
      numQuestion: oldState.numQuestion + 1,
    }), () => {
      const { numQuestion } = this.state;
      saveNumQ(numQuestion);
    }, clearInterval(updateT)); // Ajuda: Victor Cabrera Lopes Cardoso / ref: https://github.com/tryber/sd-010-b-project-trivia-react-redux/commits/main-group-19
    const four = 4;
    const { numQuestion } = this.state;
    if (numQuestion === four) { history.push('/feedback'); }
  }

  render() {
    const { props: { result },
      state: { arrRandom, isClicked, timer, isDisabled } } = this;
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
            disabled={ isDisabled }
          >
            { answer }
          </button>
        ))}

        { isClicked
        && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ () => { this.add1ToNQ(); } }
          >
            Próxima
          </button>) }
        <span>{timer}</span>
      </>
    );
  }
}

Question.propTypes = {
  result: PropTypes.arrayOf().isRequired,
  // disabled: PropTypes.bool.isRequired,
  // timer: PropTypes.number.isRequired,
  saveNumQ: PropTypes.func.isRequired,
  numQuestion: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  numQuestion: state.game.numQuestion,
});

const mapDispatchToProps = (dispatch) => ({
  saveNumQ: (numQuestion) => dispatch(saveNumQuestion(numQuestion)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
