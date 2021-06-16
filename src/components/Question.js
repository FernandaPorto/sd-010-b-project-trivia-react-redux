import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Question extends Component {
  render() {
    const { questions, index } = this.props;
    // const { category, question, correct_answer: correct } = questions[index];
    console.log(questions[index]);
    return (
      <section>
        <div data-testid="question-category">{ questions[index].category}</div>
        <div data-testid="question-text">{ questions[index].question}</div>
        <div>
          <button type="button" data-testid="correct-answer">
            { questions[index].correct }
          </button>
          <button type="button" data-testid="wrong-answer">2</button>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.trivia.questions,
});

export default connect(mapStateToProps)(Question);

Question.propTypes = {
  questions: propTypes.arrayOf(propTypes.object).isRequired,
  index: propTypes.number.isRequired,
};
