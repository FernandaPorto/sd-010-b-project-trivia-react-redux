import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchApiQuestions, fetchAPI } from '../actions/index';

import './trivia.css';

class Trivia extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      correct: '',
      reject: '',
      seconds: 30,
      disable: false,
      pontosState: 0,
      next: true,

    };

    this.renderQuestion = this.renderQuestion.bind(this);
    this.colorAnswers = this.colorAnswers.bind(this);
    this.update = this.update.bind(this);
    // this.saveStorage = this.saveStorage.bind(this);
  }

  componentDidMount() {
    const { pontosState } = this.state;
    localStorage.setItem('player', JSON.stringify(pontosState));
    this.getQuestions();
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
    const { thunkToken } = this.props;
    const quantityQuestions = 1;
    const token = await thunkToken();
    const tokenRequisition = token.result.token;
    const { apiQuestions } = this.props;
    const response = await apiQuestions(tokenRequisition, quantityQuestions);
    this.setState({
      questions: response.questions.results,
    });
  }

  update(state) {
    const MIN_SECONDS = 0;
    if (state.seconds === MIN_SECONDS) {
      this.setState({
        seconds: 30,
        correct: 'correct_answer',
        reject: 'incorrect_answer',
        disable: true });
    }
  }

  // saveStorage() {
  //   const { pontosState } = this.state;
  //   localStorage.setItem('player', JSON.stringify(pontosState));
  // }

  colorAnswers() {
    const { questions, seconds, pontosState } = this.state;
    // const { difficultyQuestions } = this.props;
    const { difficulty } = questions[0];
    const levelQuestion = difficulty;
    const pointsHard = 3;
    const pointsMedium = 2;
    const pointsEasy = 1;
    const somaPontos = 10;
    // const difficultyLevels = {
    //   hard: 3,
    //   medium: 2,
    //   easy: 1,
    // };
    // const pointScore = somaPontos + seconds * difficultyLevels[difficultyQuestions];
    // apiQuestions(pointScore);
    let pontosRender;
    if (levelQuestion === 'hard') {
      pontosRender = somaPontos + (seconds * pointsHard);
    } else if (levelQuestion === 'medium') {
      pontosRender = somaPontos + (seconds * pointsMedium);
    } else {
      pontosRender = somaPontos + (seconds * pointsEasy);
    }
    this.setState((prevState) => ({ ...prevState,
      correct: 'correct_answer',
      reject: 'incorrect_answer',
      pontosState: prevState.pontosState + pontosRender,
      next: false }));

    localStorage.setItem('player', JSON.stringify(pontosState));
    // console.log(pontosState);
  }

  renderQuestion() {
    const { questions, correct, reject, disable } = this.state;
    return (
      questions.map((question, index) => (

        <ul key={ question.category }>
          <p data-testid="question-category">{question.category}</p>
          <li data-testid="question-text">
            {question.question}
            {' '}
            <button
              disabled={ disable }
              className={ correct }
              data-testid="correct-answer"
              onClick={ this.colorAnswers }
              type="button"
            >
              {question.correct_answer}

            </button>
            {question.incorrect_answers.map((incorrect) => (
              <button
                disabled={ disable }
                data-testid={ `wrong-answer-${index}` }
                onClick={ this.colorAnswers }
                key={ incorrect }
                type="button"
                className={ reject }
              >

                {incorrect}
              </button>
            ))}
          </li>
        </ul>
      ))
    );
  }

  render() {
    const { seconds, pontosState, next } = this.state;
    console.log(pontosState);
    // console.log(seconds);
    return (
      <div>
        <Header />
        <h3>
          {seconds}
          {' '}
          {pontosState}
        </h3>
        {this.renderQuestion()}
        <button
          type="button"
          data-testid="btn-next"
          hidden={ next }
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
};

const mapDispatchToProps = (dispatch) => ({
  apiQuestions: (token, perguntas) => dispatch(fetchApiQuestions(token, perguntas)),
  thunkToken: () => dispatch(fetchAPI()),
});

export default connect(null, mapDispatchToProps)(Trivia);
// errei o nome do commitS

/* para criação do cronômetro, utilizamos como referência o exercício do bloco 13.1 feito pelo instrutor Ícaro <https://github1s.com/tryber/sd-10b-live-lectures/tree/lecture/13.1> */
