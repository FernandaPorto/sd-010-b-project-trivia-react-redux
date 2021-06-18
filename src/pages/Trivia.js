/* eslint-disable camelcase */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { fetchApiQuestions, fetchAPI, saveAssertions } from '../actions/index';

import './trivia.css';

class Trivia extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: {},
      correct: '',
      reject: '',
      seconds: 30,
      disable: false,
      pontosState: 0,
      next: true,
      OK: true,
      contador: 0,
      assertions: 0,
    };

    this.renderQuestion = this.renderQuestion.bind(this);
    this.colorAnswers = this.colorAnswers.bind(this);
    this.update = this.update.bind(this);
    this.acertou = this.acertou.bind(this);
    this.storange = this.storange.bind(this);
    this.errou = this.errou.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.countAssertions = this.countAssertions.bind(this);
  }

  async componentDidMount() {
    this.storange();
    await this.getQuestions();
    await this.renderQuestion();
    const ONE_SECOND = 1000; // 1 second in miliseconds
    const { seconds } = this.state;
    this.cronometerInterval = setInterval(() => {
      this.setState((state) => {
        if (seconds) {
          return { seconds: state.seconds - 1 };
        }
      });
    }, ONE_SECOND);
  }

  componentDidUpdate(_props, prevState) {
    this.update(prevState);
  }

  componentWillUnmount() {
    clearInterval(this.cronometerInterval);
  }

  async getQuestions() {
    this.setState((state) => ({ ...state, index: state.index + 1 }));
    const { thunkToken } = this.props;
    const quantityQuestions = 5;
    const token = await thunkToken();
    const tokenRequisition = token.result.token;
    const { apiQuestions } = this.props;
    const response = await apiQuestions(tokenRequisition, quantityQuestions);
    const { contador } = this.state;
    this.setState({
      questions: response.questions.results[0], contador: contador + 1,
    });
    console.log(contador);
  }

  update(state) {
    const MIN_SECONDS = 0;
    if (state.seconds === MIN_SECONDS) {
      this.setState({
        seconds: 30,
        correct: 'correct_answer',
        reject: 'incorrect_Answer',
        disable: true });
    }
  }

  storange() {
    const { pontosState, questions } = this.state;
    const { name, email } = this.props;

    const play = {
      player: {
        name,
        assertions: 0,
        score: pontosState,
        gravatarEmail: email,
      },
    };

    const ranking = [
      { name, score: pontosState, picture: email },
    ];

    localStorage.setItem('state', JSON.stringify(play));
    localStorage.setItem('ranking', JSON.stringify(ranking));
    localStorage.setItem('token', JSON.stringify(questions));
  }

  acertou() {
    const { questions, seconds } = this.state;
    console.log(questions);
    if (questions) {
      const { difficulty } = questions;
      const levelQuestion = difficulty;
      const pointsHard = 3;
      const pointsMedium = 2;
      const pointsEasy = 1;
      const somaPontos = 10;
      let pontosRender = 0;
      if (levelQuestion === 'hard') {
        pontosRender = somaPontos + (seconds * pointsHard);
      } else if (levelQuestion === 'medium') {
        pontosRender = somaPontos + (seconds * pointsMedium);
      } else if (levelQuestion === 'easy') {
        pontosRender = somaPontos + (seconds * pointsEasy);
      }

      this.setState((state) => ({ pontosState: state.pontosState + pontosRender }));
    }
  }

  countAssertions() {
    this.setState((state) => ({ ...state, assertions: state.assertions + 1 }));
  }

  colorAnswers() {
    this.setState((prevState) => ({ ...prevState,
      correct: 'correct_answer',
      reject: 'incorrect_Answer',
      next: false }));
  }

  async errou() {
    this.colorAnswers();
    this.storange();

    this.setState((state) => ({ pontosState: state.pontosState }));
  }

  renderQuestion() {
    const { questions: {
      category,
      correct_answer: CERTA,
      incorrect_answers,
      question },
    correct,
    reject,
    disable, contador } = this.state;
    const max = 5;
    if (contador === max) {
      return <Redirect to="/feedback" />;
    }

    return (
      <div>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question}</p>
        {
          CERTA && (
            <button
              disabled={ disable }
              className={ correct }
              data-testid="correct-answer"
              type="button"
              onClick={ async () => {
                await this.acertou();
                this.storange();
                this.colorAnswers();
                await this.countAssertions();
              } }
            >
              {CERTA}
            </button>)
        }
        {incorrect_answers
        && incorrect_answers.map((erradas, index) => (
          <button
            className={ reject }
            disabled={ disable }
            data-testid={ `wrong-answer-${index}` }
            type="button"
            key={ index }
            onClick={ this.errou }
          >
            {erradas}
          </button>))}
      </div>
    );
  }

  render() {
    const { seconds, pontosState, next } = this.state;
    return (
      <div>
        <Header />
        <h3>
          Contador:
          {seconds}
          {' '}
          Ranking:
          {pontosState}
        </h3>
        {this.renderQuestion()}
        <button
          type="button"
          data-testid="btn-next"
          hidden={ next }
          onClick={ this.getQuestions }
        >
          Próxima
        </button>
      </div>
    );
  }
}

Trivia.propTypes = {
  apiQuestions: PropTypes.func.isRequired,
  thunkToken: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  // assertion: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.reducerName.name,
  email: state.reducerName.email,
});

const mapDispatchToProps = (dispatch) => ({
  apiQuestions: (token, perguntas) => dispatch(fetchApiQuestions(token, perguntas)),
  thunkToken: () => dispatch(fetchAPI()),
  assertion: (acertos) => dispatch(saveAssertions(acertos)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
// errei o nome do commitS

/* para criação do cronômetro, utilizamos como referência o exercício do bloco 13.1 feito pelo instrutor Ícaro <https://github1s.com/tryber/sd-10b-live-lectures/tree/lecture/13.1> */
