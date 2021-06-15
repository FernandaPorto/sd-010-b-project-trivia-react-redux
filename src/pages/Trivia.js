import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchApiQuestions, fetchAPI } from '../actions/index';

class Trivia extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      // answers: [],
    };
    this.renderQuestion = this.renderQuestion.bind(this);
    // this.funcao = this.funcao.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const { thunkToken } = this.props;
    const quantityQuestions = 5;
    const token = await thunkToken();
    const tokenRequisition = token.result.token;
    const { apiQuestions } = this.props;
    const response = await apiQuestions(tokenRequisition, quantityQuestions);
    this.setState({
      questions: response.questions.results,
    });
    const { questions } = this.state;
    console.log(questions);
  }

  // answer === correct ? 'correct-answer' : 'wrong-answer-${index}'

  renderQuestion() {
    const { questions } = this.state;
    return (
      questions.map((question, index) => (
        <ul key={ question.category }>
          <p data-testid="question-category">{question.category}</p>
          <li data-testid="question-text">
            {question.question}
            {' '}
            <button type="button">
              <p
                data-testid="correct-answer"
              >
                {question.correct_answer}
              </p>
            </button>
            {question.incorrect_answers.map((incorrect) => (
              <button key={ incorrect } type="button">
                <p
                  data-testid={ `wrong-answer-${index}` }
                >
                  {incorrect}
                </p>
              </button>
            ))}
          </li>
        </ul>
      )));
  }

  // colorAnswers() {
  //   const { correct_answer: correct, answer } = this.state;
  //   return answers.map((answer, index) => {
  //     const seeColor = answer === correct ? '3px solid rgb(6, 240, 15)' : '3px solid rgb(255, 0, 0)';

  //     const verifyColor = answer === correct ? 'correct-answer' : `wrong-answer-${index}`;
  //     return (
  //       <button>
  //

  //     );
  //   });
  // }

  // funcao() {
  //   const { questions } = this.state;
  //   const questao = questions[0];
  //   return questao;
  //   // console.log(questao);
  // }

  render() {
    // const { questions } = this.state;
    // const questao = questions[0].question
    // console.log(this.funcao());
    return (
      <div>
        <Header />
        {/* <p data-testid="question-category">{questions.category}</p>
        <p data-testid="question-text">{questions.question}</p>
        <p>{questions.}</p> */}
        {this.renderQuestion()}
        {/* <button
          type="button"
          -testid={ questions === correctAnswer ? 'correct-answer' : `wrong-answer${index}` }
        /> */}
      </div>
    );
  }
}

Trivia.propTypes = {
  apiQuestions: PropTypes.func.isRequired,
};

// const mapStateToProps = (state) => ({
//   questions: state.reducerQuestion.questions,
// });

const mapDispatchToProps = (dispatch) => ({
  apiQuestions: (token, perguntas) => dispatch(fetchApiQuestions(token, perguntas)),
  thunkToken: () => dispatch(fetchAPI()),
});

export default connect(null, mapDispatchToProps)(Trivia);
