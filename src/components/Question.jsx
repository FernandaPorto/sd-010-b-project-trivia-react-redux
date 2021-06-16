import React from 'react';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.getQuestions = this.getQuestions.bind(this);

    this.state = {
      questions: [],
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const userToken = localStorage.getItem('token');
    const apiQuestion = (`https://opentdb.com/api.php?amount=5&token=${userToken}`);
    const response = await fetch(apiQuestion);
    const data = await response.json();
    this.setState({
      questions: data.results,
    });
  }

  render() {
    const { questions } = this.state;
    return (
      questions.length > 0 ? (
        <div>
          <div>
            <p data-testid="question-category">{ questions[0].category }</p>
            <h2 data-testid="question-text">
              {
                questions[0].question
              }
            </h2>
            <div>
              { questions[0].type === 'boolean' ? (
                <div>
                  <button
                    type="button"
                    data-testid="correct-answer"
                  >
                    {questions[0].correct_answer}
                  </button>
                  <button type="button">{questions[0].incorrect_answers[0]}</button>
                </div>
              ) : (
                <div>
                  <button
                    type="button"
                    data-testid="correct-answer"
                  >
                    {questions[0].correct_answer}
                  </button>
                  <button type="button">{questions[0].incorrect_answers[0]}</button>
                  <button type="button">{questions[0].incorrect_answers[1]}</button>
                  <button type="button">{questions[0].incorrect_answers[2]}</button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )
    );
  }
}

export default Question;
