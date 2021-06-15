import React from 'react';
import Header from '../components/Header';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  componentDidMount() {
    this.requestTrivia();
  }

  requestTrivia() {
    const token = localStorage.getItem('token');
    return fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((response) => response.json())
      .then((data) => this.setState({ results: data.results }));
  }

  render() {
    const { results } = this.state;
    // console.log(results);
    return (
      <>
        <Header />
        { results.map((result) => (
          <>
            <span
              key={ result.category }
              data-testid="question-category"
            >
              Category:
              {result.category}
            </span>

            <br />

            <span
              key={ result.type }
              data-testid="question-text"
            >
              Question:
              {result.question}
            </span>

            <br />

            <span
              key={ result.correct_answer }
              data-testid="correct-answer"
            >
              {result.correct_answer}
            </span>

            <br />
            <br />
          </>)) }
      </>
    );
  }
}

export default Game;
