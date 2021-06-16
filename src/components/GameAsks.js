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
      countDown: 30,
      disabledButton: false,
    };
    this.answer = this.answer.bind(this);
    this.disabledButton = this.disabledButton.bind(this);
    this.counter = this.counter.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.setAsksState = this.setAsksState.bind(this);
  }

  componentDidMount() {
    this.setAsksState();
    this.counter();
    this.disabledButton();
  }

  componentWillUnmount() {
    clearInterval(this.counter);
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

  counter() {
    const SECOND = 1000;
    setInterval(() => {
      this.setState((state) => ({ countDown: state.countDown - 1 }));
    }, SECOND);
  }

  nextQuestion() {
    const { indexQuestion, asks } = this.state;
    this.setState((state) => ({
      indexQuestion: state.indexQuestion + 1,
      countDown: 30,
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

  disabledButton() {
    const THIRTY_SECONDS = 30000;
    setTimeout(() => this.setState({ disabledButton: true }), THIRTY_SECONDS);
  }

  render() {
    const { indexQuestion,
      loading, asks, answer, disabled, countDown, disabledButton } = this.state;
    if (loading) {
      return (
        <span>Carregando...</span>
      );
    }
    // console.log(this.timer());
    return (
      <section>
        <p>{countDown}</p>
        <p data-testid="question-category">{ asks[indexQuestion].category }</p>
        <h1 data-testid="question-text">{asks[indexQuestion].question}</h1>
        {asks[indexQuestion].incorrect_answers.map((element, indexI) => (
          <button
            key={ indexI }
            type="button"
            disabled={ disabledButton }
            onClick={ this.answer }
            className={ answer ? 'incorrect' : 'null' }
            data-testid={ `wrong-answer-${indexI}` }
          >
            { element }
          </button>
        ))}
        <button
          type="button"
          disabled={ disabledButton }
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
          Próxima
        </button>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  asksG: state.asksReducer.asks,
});

export default connect(mapStateToProps)(GameAsks);
