import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { receiveToken, requestQuestions,
  toggleStatusCronometer, receiveScore } from '../actions';
import '../style/question.css';
import { updateAssertionsAndScore } from '../helpers/localStorage';

const MAX_INDEX = 4;

class Question extends Component {
  constructor() {
    super();
    this.state = {
      indexQuestion: 0,
      showBorders: false,
      disabledOptions: false,
      showNextButton: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.startCronometer = this.startCronometer.bind(this);
    this.stopCronometer = this.stopCronometer.bind(this);
    this.resetButtons = this.resetButtons.bind(this);
  }

  async componentDidMount() {
    const { getQuestions, getToken, token } = this.props;
    getToken();
    await getQuestions(token);
    this.startCronometer();
  }

  componentDidUpdate(_, prevState) {
    const MIN_SECONDS = 1;
    if (prevState.seconds === MIN_SECONDS) {
      this.stopCronometer();
      this.resetButtons();
    }
  }

  resetButtons() {
    this.setState({
      showBorders: false,
      disabledOptions: true,
      showNextButton: true,
    });
  }

  startCronometer() {
    this.setState({ seconds: 30 });
    const ONE_SECOND = 1000; // 1 second in miliseconds
    this.cronometerInterval = setInterval(() => {
      this.setState((state) => ({ seconds: state.seconds - 1 }));
    }, ONE_SECOND);
  }

  stopCronometer() {
    clearInterval(this.cronometerInterval);
  }

  handleClick({ target: { id } }) {
    this.setState({
      showBorders: true,
      disabledOptions: true,
      showNextButton: true,
    });
    this.stopCronometer();
    if (id === 'correct-answer') {
      const { indexQuestion, seconds } = this.state;
      const { updateScore, questions } = this.props;
      const { difficultyLevel } = questions[indexQuestion];
      updateAssertionsAndScore(difficultyLevel, seconds);
      updateScore();
    }
  }

  handleNext() {
    this.setState((prevState) => ({
      indexQuestion: prevState.indexQuestion + 1,
      showBorders: false,
      disabledOptions: false,
      showNextButton: false,
    }));
    this.startCronometer();
  }

  render() {
    const { questions } = this.props;
    const {
      indexQuestion, seconds, showBorders, disabledOptions, showNextButton,
    } = this.state;

    if (indexQuestion > MAX_INDEX) {
      return <Redirect to="/feedback" />;
    }

    if (questions.length) {
      const { category, question, answers } = questions[indexQuestion];
      return (
        <section>
          <div data-testid="question-category">{ category }</div>
          <div data-testid="question-text">{ question }</div>
          <div className="options">
            {answers.map(({ answer, dataTestId }, index) => (
              <button
                onClick={ this.handleClick }
                type="button"
                data-testid={ `${dataTestId}` }
                key={ index }
                id={ `${dataTestId}` }
                disabled={ disabledOptions }
                className={ showBorders && (
                  dataTestId.match(/wrong/g) ? 'incorrect' : 'correct') }
              >
                {answer}
              </button>
            ))}
          </div>
          <div>{ seconds }</div>
          {showNextButton && (
            <button type="button" data-testid="btn-next" onClick={ this.handleNext }>
              Próxima
            </button>)}
        </section>
      );
    }
    return <section>carregando...</section>;
  }
}

const mapStateToProps = (state) => ({
  questions: state.trivia.questions,
  token: state.trivia.token,
  seconds: state.trivia.seconds,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(requestQuestions(token)),
  getToken: () => dispatch(receiveToken()),
  setStatusCronometer: (status) => dispatch(toggleStatusCronometer(status)),
  updateScore: () => dispatch(receiveScore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);

Question.propTypes = {
  questions: propTypes.arrayOf(propTypes.object).isRequired,
  getQuestions: propTypes.func.isRequired,
  getToken: propTypes.func.isRequired,
  token: propTypes.string.isRequired,
  updateScore: propTypes.func.isRequired,
};
