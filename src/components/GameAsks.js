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
<<<<<<< HEAD
    };
    this.answer = this.answer.bind(this);
=======
      countDown: 30,
      disabledButton: false,
    };
    this.answer = this.answer.bind(this);
    this.disabledButton = this.disabledButton.bind(this);
    this.counter = this.counter.bind(this);
>>>>>>> 346ae2346d712a75a42ec94bb06b5d74f45fcb98
    this.nextQuestion = this.nextQuestion.bind(this);
    this.setAsksState = this.setAsksState.bind(this);
  }

  componentDidMount() {
    this.setAsksState();
<<<<<<< HEAD
=======
    this.counter();
    this.disabledButton();
  }

  componentWillUnmount() {
    clearInterval(this.counter);
>>>>>>> 346ae2346d712a75a42ec94bb06b5d74f45fcb98
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

<<<<<<< HEAD
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
=======
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
>>>>>>> 346ae2346d712a75a42ec94bb06b5d74f45fcb98
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

<<<<<<< HEAD
  render() {
    const { indexQuestion, loading, asks, answer, disabled } = this.state;
=======
  disabledButton() {
    const THIRTY_SECONDS = 30000;
    setTimeout(() => this.setState({ disabledButton: true }), THIRTY_SECONDS);
  }

  render() {
    const { indexQuestion,
      loading, asks, answer, disabled, countDown, disabledButton } = this.state;
>>>>>>> 346ae2346d712a75a42ec94bb06b5d74f45fcb98
    if (loading) {
      return (
        <span>Carregando...</span>
      );
    }
<<<<<<< HEAD
    console.log(disabled);
    return (
      <section>
=======
    // console.log(this.timer());
    return (
      <section>
        <p>{countDown}</p>
>>>>>>> 346ae2346d712a75a42ec94bb06b5d74f45fcb98
        <p data-testid="question-category">{ asks[indexQuestion].category }</p>
        <h1 data-testid="question-text">{asks[indexQuestion].question}</h1>
        {asks[indexQuestion].incorrect_answers.map((element, indexI) => (
          <button
            key={ indexI }
            type="button"
<<<<<<< HEAD
=======
            disabled={ disabledButton }
>>>>>>> 346ae2346d712a75a42ec94bb06b5d74f45fcb98
            onClick={ this.answer }
            className={ answer ? 'incorrect' : 'null' }
            data-testid={ `wrong-answer-${indexI}` }
          >
            { element }
          </button>
        ))}
        <button
          type="button"
<<<<<<< HEAD
=======
          disabled={ disabledButton }
>>>>>>> 346ae2346d712a75a42ec94bb06b5d74f45fcb98
          data-testid="correct-answer"
          onClick={ this.answer }
          className={ answer ? 'correct' : 'null' }
        >
          {asks[indexQuestion].correct_answer}
        </button>
        <br />
        <button
          type="button"
<<<<<<< HEAD
=======
          style={ { display: `${answer ? 'block' : 'none'}` } }
>>>>>>> 346ae2346d712a75a42ec94bb06b5d74f45fcb98
          data-testid="btn-next"
          disabled={ disabled }
          onClick={ this.nextQuestion }
        >
<<<<<<< HEAD
          Próxima Pergunta
=======
          Próxima
>>>>>>> 346ae2346d712a75a42ec94bb06b5d74f45fcb98
        </button>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  asksG: state.asksReducer.asks,
});

export default connect(mapStateToProps)(GameAsks);
