import React from 'react';
import PropTypes from 'prop-types';
import './styleQuestion.css';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      arrRandom: [],
      fullResults: {},
    };

    this.handleResult = this.handleResult.bind(this);
    this.insertDataTestId = this.insertDataTestId.bind(this);
    this.insertClass = this.insertClass.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.handleResult();
  }

  handleResult() {
    const { result } = this.props;
    const arrAnswers = [result.correct_answer, ...result.incorrect_answers];
    const half = 0.5;
    const shuffleArray = (array) => array.sort(() => Math.random() - half); // ref: https://flaviocopes.com/how-to-shuffle-array-javascript/
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
    const { props: { result, disabled }, state: { arrRandom } } = this;
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
            disabled={ disabled }
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
  disabled: PropTypes.bool.isRequired,
};

export default Question;
