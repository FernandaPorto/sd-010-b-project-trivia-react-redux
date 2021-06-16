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
    };
    this.renderQuestion = this.renderQuestion.bind(this);
    this.colorAnswers = this.colorAnswers.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
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

  colorAnswers() {
    this.setState({ correct: 'correct_answer', reject: 'incorrect_answer' });
  }

  renderQuestion() {
    const { questions, correct, reject } = this.state;
    return (
      questions.map((question, index) => (
        <ul key={ question.category }>
          <p data-testid="question-category">{question.category}</p>
          <li data-testid="question-text">
            {question.question}
            {' '}
            <button
              className={ correct }
              data-testid="correct-answer"
              onClick={ this.colorAnswers }
              type="button"
            >

              {question.correct_answer}

            </button>
            {question.incorrect_answers.map((incorrect) => (
              <button
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
    return (
      <div>
        <Header />
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
