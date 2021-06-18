import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class GameTrivia extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pontoacao: 0,
      contagem: 30,
      disable: false,
      colorQuestions: false,
      questions: [],
      next: 0,
    };
    this.renderQuestions = this.renderQuestions.bind(this);
    this.correctAnswerScore = this.correctAnswerScore.bind(this);
    this.setContagem = this.setContagem.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.next = this.next.bind(this);
  }

  componentDidMount() {
    const mil = 1000;
    setInterval(this.setContagem, mil);
  }

  setContagem() {
    const { contagem } = this.state;
    if (contagem > 0) {
      this.setState((pontoAnterior) => ({
        ...pontoAnterior,
        contagem: pontoAnterior.contagem - 1,
      }));
    } else {
      this.setState({
        contagem: 0,
        disable: true,
        colorQuestions: true,
      });
    }
  }

  next() {
    const { next } = this.state;
    const number = 4;
    if (next < number) {
      this.setState({
        next: next + 1,
        contagem: 30,
        disable: false,
      });
    }
    this.setState({
      colorQuestions: false,
    });
    // this.correctAnswerScore();
  }

  correctAnswerScore() {
    const { getTriviaQuestions } = this.props;
    const { contagem, next } = this.state;
    const questions = getTriviaQuestions.results.results;
    questions.filter((_questions, index) => index === next).map(((question) => {
      let dificuldade = 0;
      if (question.difficulty === 'easy') {
        dificuldade = 1;
      } else if (question.difficulty === 'medium') {
        dificuldade = 2;
      } else if (question.difficulty === 'hard') {
        const three = 3;
        dificuldade = three;
      }
      const ten = 10;
      const score = ten + (contagem * dificuldade);
      const oldStorage = JSON.parse(localStorage.getItem('state'));
      const newScore = score + oldStorage.player.score;
      const newAssertion = oldStorage.player.assertions + 1;
      const newStorage = { player: {
        name: oldStorage.player.name,
        assertions: newAssertion,
        score: newScore,
        gravatarEmail: oldStorage.player.gravatarEmail,
      } };
      localStorage.setItem('state', JSON.stringify(newStorage));
      return score;
    }));
  }

  handleClick({ target }) {
    // const tempo = document.getElementById('timer').innerText;
    if (target.value === 'correct-answer') {
      this.correctAnswerScore();
    }
    this.setState({
      disable: true,
      colorQuestions: true,
    });
  }

  renderButton() {
    const { next, colorQuestions } = this.state;
    const four = 4;
    if (next === four) {
      return (
        <Link to="/feedback">
          <button
            data-testid="btn-next"
            type="button"
            onClick={ this.next }
            style={
              (colorQuestions) ? { visibility: 'visible' } : { visibility: 'hidden' }
            }
          >
            Feedback
          </button>
        </Link>
      );
    }
    return (
      <button
        data-testid="btn-next"
        type="button"
        onClick={ this.next }
        style={
          (colorQuestions) ? { visibility: 'visible' } : { visibility: 'hidden' }
        }
      >
        Next
      </button>
    );
  }

  // Resolviddo problemas e finalizado requisitos 5 e 6
  renderQuestions() {
    const { getTriviaQuestions } = this.props;
    const { next, colorQuestions, disable } = this.state;
    const questions = getTriviaQuestions.results.results;
    if (questions) {
      return questions.filter((_questions, index) => index === next).map((question) => (
        <section key={ question.index }>
          <h2 data-testid="question-category">{question.category}</h2>
          <h3 data-testid="question-text">{question.question}</h3>
          <button
            type="button"
            id="correct-answer"
            data-testid="correct-answer"
            value="correct-answer"
            onClick={ this.handleClick }
            style={ (colorQuestions) ? { border: '3px solid rgb(6, 240, 15)' } : {} }
            disabled={ disable }
          >
            {question.correct_answer}
          </button>
          {question.incorrect_answers.map((incorrect) => (
            <button
              onClick={ this.handleClick }
              id="wrong-answer"
              key={ incorrect.index }
              type="button"
              value="wrong-answer"
              data-testid={ `wrong-answer-${incorrect.index}` }
              style={ (colorQuestions) ? { border: '3px solid rgb(255, 0, 0)' } : {} }
              disabled={ disable }
            >
              {incorrect}
            </button>))}
          <section />
          { this.renderButton() }
        </section>
      ));
    }
  }

  render() {
    const { contagem } = this.state;
    return (
      <section>
        <h1>Trivia</h1>
        <h3>
          Tempo:
          <span id="timer">
            { contagem }
          </span>
        </h3>
        { this.renderQuestions() }
      </section>
    );
  }
}

GameTrivia.propTypes = {
  getTriviaQuestions: PropTypes.arrayOf(Object),
}.isRequired;

const mapStateToProps = (state) => ({
  getTriviaQuestions: state.getQuestions,
});

export default connect(mapStateToProps)(GameTrivia);
