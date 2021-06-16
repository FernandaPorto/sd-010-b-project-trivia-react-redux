import React from 'react';
import fetchToken from '../services/api';

class Trivia extends React.Component {
  constructor(props) {
    super(props);
    this.updateState = this.updateState.bind(this);
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.renderQuestion = this.renderQuestion.bind(this);

    this.state = {
      answerColor: false,
      deactivateButtons: false,
      loading: true,
      probabilityBase: 0.5,
      questionIndex: 0,
      questions: [],
    };
  }

  async componentDidMount() {
    const { token } = localStorage;
    const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;

    const requestQuestions = await fetchData(URL);
    this.updateState(requestQuestions);
  }

  updateState({ results }) {
    this.setState({
      loading: false,
      questions: results,
    });
  }

  handleAnswerClick() {
    this.setState({
      answerColor: true,
      deactivateButtons: true,
    });
  }

  renderQuestion() {
    const { questions, probabilityBase,
      questionIndex, answerColor, deactivateButtons } = this.state;
    const randomizer = (array) => (array.sort(() => Math.random() - probabilityBase));

    const answers = [
      questions[questionIndex].correct_answer,
      ...questions[questionIndex].incorrect_answers,
    ];

    const randomAnswers = randomizer(answers).map((answer, index) => {
      const answerChecker = questions[questionIndex].correct_answer;

      if (answer === answerChecker) {
        return (
          <button
            type="button"
            key={ index }
            data-testid="correct-answer"
            onClick={ this.handleAnswerClick }
            className={ answerColor ? 'green-border' : 'default-button' }
            disabled={ deactivateButtons }
          >
            { answer }
          </button>
        );
      }
      return (
        <button
          type="button"
          key={ index }
          data-testid={ `wrong-answer-${index}` }
          onClick={ this.handleAnswerClick }
          className={ answerColor ? 'red-border' : 'default-button' }
          disabled={ deactivateButtons }
        >
          { answer }
        </button>
      );
    });

    return (
      <div>
        <h2 data-testid="question-category">{ questions[questionIndex].category }</h2>
        <h3 data-testid="question-text">{ questions[questionIndex].question }</h3>
        { randomAnswers }
      </div>
    );
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      return (
        <div>
          <h3>
            LOADING...
          </h3>
        </div>
      );
    }
    return (
      <div>
        { this.renderQuestion() }
      </div>
    );
  }
}

export default Trivia;
