import React from 'react';

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

    const requestQuestions = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const dataToJSON = await requestQuestions.json();

    this.updateState(dataToJSON);
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

    const answers = [questions[currentQuestion].correct_answer, ...questions[currentQuestion].incorrect_answers];

    const randomAnswers = randomizer(answers).map((answer, index) => (
      <p key={ index }>
        { answer }
      </p>
    ));

    return (
      <div>
        <h4>{ questions[currentQuestion].question }</h4>
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
