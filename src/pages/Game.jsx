import React from 'react';
import { connect } from 'react-redux';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      code: -1,
      results: [],
    });

    this.changeState = this.changeState.bind(this);
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

  render() {
    const { results } = this.state;
    return (
      <section>
        <h2>Game</h2>
        {results[0] ? <p data-testid="question-category">{ results[0].category }</p> : 0 }
        {results[0] ? <p data-testid="question-text">{ results[0].question }</p> : 0 }
        {results[0] ? <p data-testid="correct-answer">{ results[0].category }</p> : 0 }
        
        <p </p>
      </section>
    );
  }
}

export default connect()(Game);
