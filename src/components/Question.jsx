import React from 'react';
import PropTypes from 'prop-types';
import './styleQuestion.css';
// comentario p add

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // correctButton: false,
      // wrongButton: false,
      isClicked: false,
      arrRandom: [],
      fullResults: {},
    };
    // this.handleButtonColor = this.handleButtonColor.bind(this);
    this.handleResult = this.handleResult.bind(this);
    this.insertDataTestId = this.insertDataTestId.bind(this);
    this.insertClass = this.insertClass.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.handleResult();
  }

  // handleButtonColor() {
  //   this.setState({
  //     correctButton: true,
  //     wrongButton: true,
  //   });
  // }

  handleResult() {
    const { result } = this.props;
    const arrAnswers = [result.correct_answer, ...result.incorrect_answers];
    const half = 0.5;
    const shuffleArray = (array) => array.sort(() => Math.random() - half);
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

  handleChange() {
    this.setState({ isClicked: true });
  }

  clicked(answer) {
    // isClicked ? (answer === fullResults.correct_answer ? 'correctButton' : 'wrongButton') : null
    const { fullResults, isClicked } = this.state;
    if (isClicked && answer === fullResults.correct_answer) {
      return 'correctButton';
    }
    if (isClicked && fullResults.incorrect_answers.includes(answer)) {
      return 'wrongButton';
    }
    return null;
  }

  render() {
    const { props: { result, isDisabled }, state: { arrRandom } } = this;
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
            onClick={ this.handleChange }
            className={ this.clicked(answer) }
            disabled={ isDisabled }
            // className={isClicked ? (answer === fullResults.correct_answer ? 'correctButton' : 'wrongButton') : null}
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
