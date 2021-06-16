import React from 'react';
import PropTypes from 'prop-types';
// comentario p add

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correctButton: false,
      wrongButton: false,
    };
    this.handleButtonColor = this.handleButtonColor.bind(this);
    this.handleResult = this.handleResult.bind(this);
    this.insertDataTestId = this.insertDataTestId.bind(this);
    this.insertClass = this.insertClass.bind(this);
  }

  handleButtonColor() {
    this.setState({
      correctButton: true,
      wrongButton: true,
    });
  }

  handleResult() {
    const { result } = this.props;
    const arrAnswers = [result.correct_answer, ...result.incorrect_answers];
    const half = 0.5;
    const shuffleArray = (array) => array.sort(() => Math.random() - half);
    return shuffleArray(arrAnswers);
  }

  insertDataTestId(answer, index) {
    const { result } = this.props;
    if (answer === result.correct_answer) {
      return 'correct-answer';
    }
    return `wrong-answer-${index}`;
  }

  insertClass(answer) {
    const { result } = this.props;
    if (answer === result.correct_answer) {
      return 'correctButton';
    }
    return 'wrongButton';
  }

  render() {
    const { result } = this.props;
    const arrRandom = this.handleResult();
    return (
      <>
        <span data-testid="question-category">
          { `Category: 
          ${result.category}`}
        </span>

        <br />

        <span data-testid="question-text">
          { `Question:  
          ${result.question}`}
        </span>

        <br />

        { arrRandom.map((answer, index) => (
          <button
            type="button"
            key={ answer }
            data-testid={ this.insertDataTestId(answer, index) }
            className={ this.insertClass(answer) }
            onClick={ this.handleButtonColor }
          >
            { answer }
          </button>
        ))}

      </>
    );
  }
}

Question.propTypes = {
  result: PropTypes.arrayOf().isRequired,
};

export default Question;
