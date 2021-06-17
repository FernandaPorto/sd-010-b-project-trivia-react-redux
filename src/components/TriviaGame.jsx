import React from 'react';
import { fetchQuestions } from '../services/api';
import Timer from './Timer';

class Trivia extends React.Component {
  constructor(props) {
    super(props);

    this.getQuestions = this.getQuestions.bind(this);
    this.answerQuestion = this.answerQuestion.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.renderQuestion = this.renderQuestion.bind(this);

    this.state = {
      loading: true,
      isResolved: false,
      probabilityBase: 0.5,
      questionIndex: 0,
      questions: [],
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const { token } = localStorage;
    const { results: questions } = await fetchQuestions(token);
    this.setState({
      loading: false,
      questions,
    });
  }

  answerQuestion() {
    this.setState({ isResolved: true });
  }

  nextQuestion() {
    let { questionIndex } = this.state;
    const { questions } = this.state;

    if (questionIndex < questions.length - 1) {
      questionIndex += 1;
      this.setState({ isResolved: false, questionIndex });
    }
  }

  renderQuestion(questionIndex) {
    const { questions, probabilityBase, isResolved } = this.state;

    const {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions[questionIndex];

    const randomizer = (array) => array.sort(() => Math.random() - probabilityBase);

    const answers = randomizer([correctAnswer, ...incorrectAnswers]);

    const randomAnswers = answers.map((answer, index) => {
      const isCorrect = answer === correctAnswer;
      const coloredStyle = isCorrect ? 'green-border' : 'red-border';
      const testId = isCorrect ? 'correct-answer' : `wrong-answer-${index}`;

      return (
        <button
          type="button"
          key={ index }
          data-testid={ testId }
          onClick={ this.answerQuestion }
          className={ isResolved ? coloredStyle : 'default-button' }
          disabled={ isResolved }
        >
          {answer}
        </button>
      );
    });

    return (
      <div>
        <h2 data-testid="question-category">{category}</h2>
        <h3 data-testid="question-text">{question}</h3>
        {randomAnswers}
      </div>
    );
  }

  renderNextButton() {
    return (
      <button
        type="button"
        onClick={ this.nextQuestion }
        data-testid="btn-next"
      >
        Próxima pergunta
      </button>
    );
  }

  render() {
    const { loading, isResolved, questionIndex } = this.state;
    return (
      <section>
        {loading ? <h3>LOADING...</h3> : this.renderQuestion(questionIndex)}
        { isResolved ? this.renderNextButton() : <Timer /> }

      </section>
    );
  }
}

export default Trivia;
