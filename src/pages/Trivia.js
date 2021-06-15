import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchApiQuestions } from '../actions/index';

class Trivia extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
    };
  }

  async getQuestions() {
    const quantityQuestions = 5;
    const { questions } = this.state;
    const token = localStorage.getItem('token');
    console.log(token);
    const { apiQuestions } = this.props;
    const response = await apiQuestions(token, quantityQuestions);
    this.setState({
      questions: response.questions.results,
    });
    console.log(questions);
  }

  render() {
    return (
      <div>
        <Header />
        <h2 data-testid="question-category">questão</h2>
        <p data-testid="question-text" />
        {/* <button
          type="button"
          data-testid={ questions === correctAnswer ? 'correct-answer' : `wrong-answer${index}` }
        /> */}
      </div>
    );
  }
}

Trivia.propTypes = {
  apiQuestions: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.reducerQuestion.questions,
});

const mapDispatchToProps = (dispatch) => ({
  apiQuestions: (token, perguntas) => dispatch(fetchApiQuestions(token, perguntas)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
