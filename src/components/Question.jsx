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
    const apiQuestion = `https://opentdb.com/api.php?amount=5&token=${userToken}`;
    const response = await fetch(apiQuestion)
    .then((result) => result.json())
    .then((data) =>{
      const questions = data.results.map((question) => question)
    })
    this.setState({
      questions: response.results,
    });
    console.log(this.state);
  }

  render() {
    const { questions } = this.state;
    return (
      questions.length > 0 ? (
        <div className="container">
          <div className="bg-white">
            <h1
              dangerouslySetInnerHTML={ { __html: questions.map((dt, idx) => dt.question) }
            }/>
          </
          <div className="grid gridcols-2">
          {/* <p>{dt.question}</p> */}
            <button type="button" className="bg-white p-4">
              {questions[0].correct_answer}
            </button>
            <button
              type="button"
              className="bg-white p-4"
            >
              {questions[0].incorrect_answers[0]}
            </button>
            <button
              type="button"
              className="bg-white p-4"
            >
              {questions[0].incorrect_answers[1]}
            </button>
            <button
              type="button"
              className="bg-white p-4"
            >
              {questions[0].incorrect_answers[2]}
            </button>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )
    );
  }
}

export default Question;
