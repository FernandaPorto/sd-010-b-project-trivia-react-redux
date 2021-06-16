import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { questionAction } from '../actions';
import './Questions.css';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      active: false,
      seconds: 30,
      buttonsDisabled: false,
    };
    this.multipleQuestion = this.multipleQuestion.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { token, dispatchQuestions } = this.props;
    const ONE_SECOND = 1000;
    const FIVE_SECONDS = 5000;
    dispatchQuestions(token);
    this.countdownInterval = setInterval(() => {
      const { seconds } = this.state;
      if (seconds > 0) {
        this.setState({ seconds: seconds - 1 });
      }
      if (seconds === 0) {
        this.setState({ buttonsDisabled: true });
        setTimeout(() => { this.setState({ active: true }); }, FIVE_SECONDS);
      }
    }, ONE_SECOND);
  }

  handleClick() {
    this.setState({ active: true });
  }

  multipleQuestion(param) {
    const { category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = param;
    const { active, seconds, buttonsDisabled } = this.state;
    return (
      <div>
        <h3 data-testid="question-category">{ category }</h3>
        <p data-testid="question-text">{ question }</p>
        <button
          onClick={ this.handleClick }
          className={ active ? 'acertou' : null }
          type="button"
          data-testid="correct-answer"
          disabled={ buttonsDisabled }
        >
          { correctAnswer }
        </button>
        { incorrectAnswers.map((item, index) => (
          <button
            onClick={ this.handleClick }
            className={ active ? 'errou' : null }
            type="button"
            data-testid={ `wrong-answer-${index}` }
            key={ index }
            disabled={ buttonsDisabled }
          >
            { item }
          </button>
        ))}
        <h2>{ seconds }</h2>
      </div>
    );
  }

  render() {
    const { questions } = this.props;
    console.log(questions[0]);
    return (
      <main>
        { questions.length > 0 ? this.multipleQuestion(questions[0]) : null}
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.loginReducer.token,
  questions: state.questionsReducer.questions,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchQuestions: (questions) => dispatch(questionAction(questions)),
});

Questions.propTypes = {
  token: PropTypes.string.isRequired,
  dispatchQuestions: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
