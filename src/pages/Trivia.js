import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchApiQuestions, fetchAPI } from '../actions/index';

import './trivia.css';

class Trivia extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      correct: '',
      reject: '',
      seconds: 30,
      disable: false,
    };
    this.renderQuestion = this.renderQuestion.bind(this);
    this.colorAnswers = this.colorAnswers.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
    const ONE_SECOND = 1000; // 1 second in miliseconds
    const { seconds } = this.state;
    this.cronometerInterval = setInterval(() => {
      console.log('interval rodando');
      this.setState((state) => {
        if (seconds) {
          return { seconds: state.seconds - 1 };
        }
      });
    }, ONE_SECOND);
  }

  componentDidUpdate(_prevProps, prevState) {
    this.update(prevState);
  }

  componentWillUnmount() {
    clearInterval(this.cronometerInterval);
  }

  async getQuestions() {
    const { thunkToken } = this.props;
    const quantityQuestions = 1;
    const token = await thunkToken();
    const tokenRequisition = token.result.token;
    const { apiQuestions } = this.props;
    const response = await apiQuestions(tokenRequisition, quantityQuestions);
    this.setState({
      questions: response.questions.results,
    });
  }

  update(state) {
    const MIN_SECONDS = 0;
    if (state.seconds === MIN_SECONDS) {
      this.setState({ seconds: 30, correct: 'correct_answer', reject: 'incorrect_answer', disable: true });
    }
  }

  colorAnswers() {
    this.setState({ correct: 'correct_answer', reject: 'incorrect_answer' });
  }

  renderQuestion() {
    const { questions, correct, reject, disable } = this.state;
    return (
      questions.map((question, index) => (

        <ul key={ question.category }>
          <p data-testid="question-category">{question.category}</p>
          <li data-testid="question-text">
            {question.question}
            {' '}
            <button
              disabled={ disable }
              className={ correct }
              data-testid="correct-answer"
              onClick={ this.colorAnswers }
              type="button"
            >

              {question.correct_answer}

            </button>
            {question.incorrect_answers.map((incorrect) => (
              <button
                disabled={ disable }
                data-testid={ `wrong-answer-${index}` }
                onClick={ this.colorAnswers }
                key={ incorrect }
                type="button"
                className={ reject }
              >

                {incorrect}
              </button>
            ))}
          </li>
        </ul>
      ))
    );
  }

  render() {
    const { seconds } = this.state;
    return (
      <div>
        <Header />
        <h3>
          {seconds}
        </h3>
        {this.renderQuestion()}
      </div>
    );
  }
}

Trivia.propTypes = {
  apiQuestions: PropTypes.func.isRequired,
  thunkToken: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  apiQuestions: (token, perguntas) => dispatch(fetchApiQuestions(token, perguntas)),
  thunkToken: () => dispatch(fetchAPI()),
});

export default connect(null, mapDispatchToProps)(Trivia);
// errei o nome do commit

/* para criação do cronômetro, utilizamos como referência o exercício do bloco 13.1 feito pelo instrutor Ícaro <https://github1s.com/tryber/sd-10b-live-lectures/tree/lecture/13.1> */
