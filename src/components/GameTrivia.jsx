import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class GameTrivia extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contador: 0,
      contagem: 30,
      disable: false,
      colorQuestions: false,
      questions: [],
      next: 0,
    };
    this.renderQuestions = this.renderQuestions.bind(this);
    this.setContagem = this.setContagem.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.next = this.next.bind(this);
    // this.salvarPontos = this.salvarPontos.bind(this);
  }

  // componentDidMount() {
  //   // const milisegundos = 1000;
  //   // setInterval(this.setContagem, milisegundos);
  //   // this.salvarPontos();
  // }

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
      });
    }
  }

  next() {
    const { next } = this.state;
    const number = 4;
    if (next < number) {
      this.setState({
        next: next + 1,
      });
    }
    this.setState({
      colorQuestions: false,
    });
  }

  handleClick() {
    this.setState({
      colorQuestions: true,
    });
  }

  // componentDidMount() {
  //   const { getTriviaQuestions } = this.props;
  //   getTriviaQuestions();
  // }
  // Resolviddo problemas e finalizado requisitos 5 e 6
  renderQuestions() {
    const { getTriviaQuestions } = this.props;
    const { next, colorQuestions } = this.state;
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
            >
              {incorrect}
            </button>))}
          <section>
            <button
              data-testid="btn-next"
              type="button"
              onClick={ this.next }
            >
              Next
            </button>
          </section>
        </section>
      ));
    }
  }

  render() {
    // const { getTriviaQuestions } = this.props;

    return (
      <section>
        <h1>Trivia</h1>
        { this.renderQuestions() }
      </section>
    );
  }
}

GameTrivia.propTypes = {
  getTriviaQuestions: PropTypes.arrayOf(Object),
}.isRequired;

// const mapDispatchToProps = (dispatch) => ({
//   getTriviaQuestions: () => dispatch(getTriviaApi()),
// });

const mapStateToProps = (state) => ({
  getTriviaQuestions: state.getQuestions,
});

export default connect(mapStateToProps)(GameTrivia);
