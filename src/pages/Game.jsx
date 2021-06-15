import React from 'react';
import { connect } from 'react-redux';
import GameHeader from './GameHeader';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      code: -1,
      results: [],
      indexQuestion: 0,
    });

    this.changeState = this.changeState.bind(this);
    this.renderPage = this.renderPage.bind(this);
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const apiResults = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((resp) => resp.json());
    this.changeState(apiResults);
  }

  changeState(apiResults) {
    const { results } = apiResults;
    this.setState({ code: apiResults.response_code,
      results });
    console.log(this.state);
  }

  renderPage() {
    const { code, results, indexQuestion } = this.state;
    if (code === 0) {
      const answersArray = results[indexQuestion].incorrect_answers
        .concat(results[indexQuestion].correct_answer);
      answersArray.sort(() => Math.random() - 0.5);
      return (
        <section>
          <p data-testid="question-category">{ results[indexQuestion].category }</p>
          <p data-testid="question-text">{ results[indexQuestion].question }</p>
          { answersArray.map((answer, index) => (
            <button
              data-testid={ answer === results[indexQuestion].correct_answer
                ? 'correct-answer' : `answer-${index}` }
              key={ index }
              type="submit"
              onClick={ () => this.setState({ indexQuestion: indexQuestion + 1 }) }
            >
              {answer}
            </button>))}

        </section>
      );
    }
  }

  render() {
    return (
      <section>
        <GameHeader />
        {this.renderPage()}
      </section>

    );
  }
}

export default connect()(Game);
