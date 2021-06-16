import React from 'react';
import fetchToken from '../services/api';

class Trivia extends React.Component {
  constructor(props) {
    super(props);
    this.updateState = this.updateState.bind(this);
    this.renderQuestion = this.renderQuestion.bind(this);

    this.state = {
      loading: true,
      questions: [],
    };
  }

  async componentDidMount() {
    const { token } = localStorage;
    const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;

    const requestQuestions = await fetchToken(URL);
    this.updateState(requestQuestions);
  }

  updateState({ results }) {
    this.setState({
      loading: false,
      questions: results,
      currentQuestion: 0,
    });
  }

  renderQuestion() {
    const { questions, currentQuestion } = this.state;
    const POINT_FIVE = 0.5;
    const randomizer = (array) => (
      array.sort(() => Math.random() - POINT_FIVE)
    );

    const answers = [
      questions[currentQuestion].correct_answer,
      ...questions[currentQuestion].incorrect_answers,
    ];

    const randomAnswers = randomizer(answers).map((answer, index) => {
      const correctAnswerID = 'correct-answer';
      const answerChecker = questions[currentQuestion].correct_answer;

      if (answer === answerChecker) {
        return (
          <p key={ index } data-testid={ correctAnswerID }>
            { answer }
          </p>
        );
      }
      return (
        <p key={ index } data-testid={ `wrong-answer-${index}` }>
          { answer }
        </p>
      );
    });

    return (
      <div>
        <h2 data-testid="question-category">
          { questions[currentQuestion].category }
        </h2>
        <h3 data-testid="question-text">
          { questions[currentQuestion].question }
        </h3>
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
