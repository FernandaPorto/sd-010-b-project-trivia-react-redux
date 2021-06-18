import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions } from '../redux/actions';
import combineArray from '../functions/combineArray';
import addInfoToLocalStorage from '../functions/addInfoToStorage';
import nexButton from '../functions/nextButton';
import { changeClassNameCorrect,
  changeClassNameInCorrect } from '../functions/classNameFunction';
import { getGravatar, getPerfilGravatar } from '../functions/getGravatar';
import getScore from '../functions/getScore';

class Game extends React.Component {
  constructor() {
    super();
    this.state = { numberQuestion: 0,
      correct: 0,
      clicked: false,
      numberOfAssertions: 0,
      score: 0,
      timerInitial: 30,
      disabled: false,
    };
    this.renderAnswers = this.renderAnswers.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  componentDidMount() {
    const { fetchQuestions: getQuestions } = this.props;
    const token = localStorage.getItem('token');
    getQuestions(token);
    const segundo = 500;
    this.timerInterval = setInterval(() => {
      this.setState((state) => ({
        timerInitial: state.timerInitial - 1,
      }));
    }, segundo);
  }

  // https://www.youtube.com/watch?v=kIQbixDDq5w
  // https://medium.com/@ashleywnj/componentdidupdate-prevstate-prevprops-and-a-silly-mistake-38afc72f5abc
  componentDidUpdate(_prevProps, prevState) {
    if (prevState.timerInitial === 0) {
      // console.log('Ta na hora de parar');
      this.resetTimer();
    }
    // console.log('qualquer coisa');
  }

  handleOnClick({ target: { name } }) {
    const { numberQuestion, correct } = this.state;
    const { questions } = this.props;
    if (name === questions[numberQuestion].correct_answer) {
      const totalScore = getScore(this.state, this.props).score;
      const totalAssertions = getScore(this.state, this.props).numberOfAssertions;
      this.setState((old) => ({
        ...old,
        correct: correct + 1,
        score: totalScore,
        numberOfAssertions: totalAssertions,
      }));
    }
    this.setState({
      clicked: true,
    });
  }

  nextQuestion() {
    const { numberQuestion } = this.state;
    this.setState({
      numberQuestion: numberQuestion + 1,
      clicked: false,
    });
  }

  resetTimer() {
    this.setState({
      timerInitial: 0,
      disabled: true,
    });
    clearInterval(this.timerInterval);
    console.log(this.nextQuestion());
  }

  renderAnswers() {
    const { numberQuestion, disabled, clicked } = this.state;
    const { questions } = this.props;
    return (
      <div>
        <p data-testid="question-category">{questions[numberQuestion].category}</p>
        <p data-testid="question-text">
          {questions[numberQuestion].question }
        </p>
        {combineArray(questions, numberQuestion).map((answer, index) => {
          if (answer === questions[numberQuestion].correct_answer) {
            return (
              <button
                disabled={ disabled }
                name={ `${answer}` }
                className={ changeClassNameCorrect(clicked) }
                key={ answer }
                type="button"
                data-testid="correct-answer"
                onClick={ this.handleOnClick }
              >
                {answer}
              </button>
            );
          }
          return (
            <button
              disabled={ disabled }
              name={ `${answer}` }
              className={ changeClassNameInCorrect(clicked) }
              key={ answer }
              type="button"
              data-testid={ `wrong-answer-${index}` }
              onClick={ this.handleOnClick }
            >
              {answer}
            </button>
          );
        })}
        {nexButton(this.state, this.props, this.nextQuestion, getGravatar)}
      </div>
    );
  }

  render() {
    const { score, timerInitial, numberOfAssertions } = this.state;
    const { questions } = this.props;
    const { location: { aboutProps: { name: { name },
      email: { email } } } } = this.props;
    addInfoToLocalStorage(name, email, score, numberOfAssertions);
    return (
      <>
        {getPerfilGravatar(email, name, score)}
        {questions && this.renderAnswers()}
        { timerInitial }
      </>
    );
  }
}

Game.propTypes = {
  location: PropTypes.shape({
    aboutProps: PropTypes.shape({
      name: PropTypes.shape({
        name: PropTypes.string }),
      email: PropTypes.shape({
        email: PropTypes.string }),
      score: PropTypes.shape({
        score: PropTypes.number }),
    }),
  }).isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchQuestions: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questions.results,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (token) => dispatch(fetchQuestions(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
