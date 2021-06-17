import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class GameAsks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexQuestion: 0,
      loading: true,
      asks: [],
      answer: false,
      countDown: 30,
      disabledButton: false,
      redirect: false,
    };
    this.answer = this.answer.bind(this);
    this.counter = this.counter.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.setAsksState = this.setAsksState.bind(this);
    this.timer = this.timer.bind(this);
    this.totalSum = this.totalSum.bind(this);
  }

  componentDidMount() {
    this.setAsksState();
    this.counter();
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval);
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
    this.timeInterval = setInterval(this.timer, SECOND);
  }

  timer() {
    const { countDown } = this.state;
    if (countDown <= 0) {
      this.setState({
        countDown: 0,
      });
    } else {
      this.setState((state) => ({
        countDown: state.countDown - 1,
      }));
    }
    if (countDown === 0) {
      this.setState({
        disabledButton: true,
      });
    }
  }

  totalSum() {
    const { asks, indexQuestion, countDown } = this.state;
    const localStorageInfos = JSON.parse(localStorage.getItem('state'));
    const { player: { score, assertions } } = localStorageInfos;
    const UM = 1;
    const DOIS = 2;
    const TRES = 3;
    const DEZ = 10;
    switch (asks[indexQuestion].difficulty) {
    case (asks[indexQuestion].difficulty === 'hard'):
      localStorageInfos.player.score = score + DEZ + (countDown * TRES);
      localStorageInfos.player.assertions = assertions + 1;
      localStorage.setItem('state', JSON.stringify(localStorageInfos));
      break;
    case (asks[indexQuestion].difficulty === 'medium'):
      localStorageInfos.player.score = score + DEZ + (countDown * DOIS);
      localStorageInfos.player.assertions = assertions + 1;
      localStorage.setItem('state', JSON.stringify(localStorageInfos));
      break;
    default:
      localStorageInfos.player.score = score + DEZ + (countDown * UM);
      localStorageInfos.player.assertions = assertions + 1;
      localStorage.setItem('state', JSON.stringify(localStorageInfos));
      break;
    }
  }

  nextQuestion() {
    clearInterval(this.counter);
    const { indexQuestion, asks } = this.state;
    this.setState((state) => ({
      indexQuestion: state.indexQuestion + 1,
      countDown: 30,
      disabledButton: false,
      answer: false,
    }));
    if (asks.length - 1 === indexQuestion) {
      this.setState({ redirect: true });
    }
  }

  answer() {
    this.setState({
      answer: true,
    });
  }

  render() {
    const { indexQuestion,
      loading, asks, answer, countDown, disabledButton, redirect } = this.state;
    if (loading) return <span>Carregando...</span>;
    if (redirect) return <Redirect to="/feedback" />;
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
          onClick={ () => {
            this.answer();
            this.totalSum();
          } }
          className={ answer ? 'correct' : 'null' }
        >
          {asks[indexQuestion].correct_answer}
        </button>
        <br />
        <button
          className="next-button"
          type="button"
          style={ { display: `${answer ? 'block' : 'none'}` } }
          data-testid="btn-next"
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
