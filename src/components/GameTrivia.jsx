import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { getTriviaApi } from '../actions';

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
  }

  // componentDidMount() {
  //   const { getTriviaQuestions } = this.props;
  //   getTriviaQuestions();
  // }

  renderQuestions() {
    const { getTriviaQuestions } = this.props;
    const { next } = this.state;
    console.log(getTriviaQuestions);
    console.log(getTriviaQuestions.isLoadingTrivia);
    const questions = getTriviaQuestions.results.results;
    if (questions) {
      return questions.filter((_questions, index) => index === next).map((question) => (
        <section key={ question.index }>
          <h2 data-testid="question-category">{question.category}</h2>
          <h3 data-testid="question-text">{question.question}</h3>
          <button
            type="button"
            data-testid="correct-answer"
            // style={ (colorQuestions) ? { border: '3px solid rgb(6, 240, 15)' } : {} }
          >
            {question.correct_answer}
          </button>
          {question.incorrect_answers.map((incorrect) => (
            <button
              key={ incorrect.index }
              type="button"
              data-testid={ `wrong-answer-${incorrect.index}` }
              // style={ (colorQuestions) ? { border: '3px solid rgb(255, 0, 0)' } : {} }
            >
              {incorrect}
            </button>))}
          <section>
            <button type="button" onClick={ this.next }>Next</button>
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
