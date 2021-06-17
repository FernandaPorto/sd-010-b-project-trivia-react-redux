import React, { Component } from 'react';
import { connect } from 'react-redux';

class GameAsks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexQuestion: 0,
      loading: true,
      asks: [],
      answer: false,
      disabled: false,
    };
    this.answer = this.answer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.setAsksState = this.setAsksState.bind(this);
  }

  componentDidMount() {
    this.setAsksState();
  }

  async setAsksState() {
    const tokenResponse = await fetch('https://opentdb.com/api_token.php?command=request');
    const token = await tokenResponse.json();
    localStorage.setItem('token', token.token);
    const asksResponse = await fetch(`https://opentdb.com/api.php?amount=5&token=${token.token}`);
    const asks = await asksResponse.json();
    this.setState({
      asks: asks.results,
      loading: false,
    });
  }

  // correctClick({ target }) {
  //   target.style.border = '3px solid rgb(6, 240, 15)';
  //   const element = document.querySelector('.wrong-answer');
  //   element.disabled = true;
  // }

  // incorrectClick({ target }) {
  //   target.style.border = '3px solid rgb(255, 0, 0)';
  //   const element = document.querySelector('.correct-answer');
  //   element.disabled = true;
  // }

  nextQuestion({ target }) {
    const { indexQuestion, asks, disabled } = this.state;
    this.setState((state) => ({
      indexQuestion: state.indexQuestion + 1,
    }));
    if (asks.length - 2 === indexQuestion) {
      this.setState({ disabled: true });
    }
  }

  answer() {
    this.setState({
      answer: true,
    });
  }

  render() {
    const { indexQuestion, loading, asks, answer, disabled } = this.state;
    if (loading) {
      return (
        <span>Carregando...</span>
      );
    }
    console.log(disabled);
    return (
      <section>
        <p data-testid="question-category">{ asks[indexQuestion].category }</p>
        <h1 data-testid="question-text">{asks[indexQuestion].question}</h1>
        {asks[indexQuestion].incorrect_answers.map((element, indexI) => (
          <button
            key={ indexI }
            type="button"
            onClick={ this.answer }
            className={ answer ? 'incorrect' : 'null' }
            data-testid={ `wrong-answer-${indexI}` }
          >
            { element }
          </button>
        ))}
        <button
          type="button"
          data-testid="correct-answer"
          onClick={ this.answer }
          className={ answer ? 'correct' : 'null' }
        >
          {asks[indexQuestion].correct_answer}
        </button>
        <br />
        <button
          type="button"
          data-testid="btn-next"
          disabled={ disabled }
          onClick={ this.nextQuestion }
        >
          Próxima Pergunta
        </button>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  asksG: state.asksReducer.asks,
});

export default connect(mapStateToProps)(GameAsks);
