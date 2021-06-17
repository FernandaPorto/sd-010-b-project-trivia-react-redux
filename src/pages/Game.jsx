import React from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchQuestions } from '../redux/actions';
import combineArray from '../functions/combineArray';

class Game extends React.Component {
  constructor() {
    super();
    this.state = { numberQuestion: 0,
      correct: 0,
      clicked: false,
      numberOfAssertions: 0,
      score: 0,
      redirectToHome: false,
    };
    this.getPerfilGravatar = this.getPerfilGravatar.bind(this);
    this.renderAnswers = this.renderAnswers.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.nextButton = this.nextButton.bind(this);
    this.addInfoToLocalStorage = this.addInfoToLocalStorage.bind(this);
    this.getGravatar = this.getGravatar.bind(this);
    this.getScore = this.getScore.bind(this);
  }

  componentDidMount() {
    const { fetchQuestions: getQuestions } = this.props;
    const token = localStorage.getItem('token');
    getQuestions(token);
  }

  getGravatar(email) {
    const convert = md5(email).toString();
    const endpoint = `https://www.gravatar.com/avatar/${convert}`;
    return endpoint;
  }

  getPerfilGravatar(email, name, score) {
    const endpoint = this.getGravatar(email);
    return (
      <div>
        <img src={ endpoint } alt={ `foto de ${name}` } />
        <span data-testid="header-player-name">
          {`Bem-vindo ${name}`}
          !
        </span>
        <span data-testid="header-profile-picture">{` Email: ${email}`}</span>
        <span data-testid="header-score">{` Pontuação: ${score}`}</span>
      </div>
    );
  }

  getScore() {
    const { numberOfAssertions, numberQuestion, score } = this.state;
    const { questions } = this.props;
    const defaultNumber = 10;
    const hardQuestion = 3;
    const mediumQuestion = 2;
    const easyQuestion = 1;
    let { difficulty } = questions[numberQuestion];
    if (difficulty === 'hard') {
      difficulty = hardQuestion;
    } if (difficulty === 'medium') {
      difficulty = mediumQuestion;
    } else {
      difficulty = easyQuestion;
    }
    const timer = 2; // colocar o valor do timer que o Fioravante está fazendo
    this.setState({
      numberOfAssertions: numberOfAssertions + 1,
      score: score + (defaultNumber + (timer * difficulty)),
    });
  }

  addInfoToLocalStorage() {
    const { location: { aboutProps: { name: { name },
      email: { email } } } } = this.props;
    const { numberOfAssertions, score } = this.state;
    const objLocalStorage = {
      player: {
        name,
        assertions: numberOfAssertions,
        score,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(objLocalStorage)); // Referência https://www.horadecodar.com.br/2020/07/21/como-salvar-um-objeto-na-localstorage/
  }

  handleOnClick({ target: { name } }) {
    const { numberQuestion, correct } = this.state;
    const { questions } = this.props;
    if (name === questions[numberQuestion].correct_answer) {
      this.getScore();
      this.setState({
        correct: correct + 1,
      });
    }
    this.setState({
      clicked: true,
    });
  }

  nextQuestion() {
    const { numberQuestion } = this.state;
    this.setState({
      numberQuestion: numberQuestion + 1,
      clicked: false,
    });
  }

  changeClassNameCorrect() {
    const { clicked } = this.state;
    if (clicked) {
      return 'correct_answer';
    }
    return '';
  }

  changeClassNameInCorrect() {
    const { clicked } = this.state;
    if (clicked) {
      return 'incorrect_answer';
    }
    return '';
  }

  nextButton() {
    const { clicked, numberQuestion } = this.state;
    const { questions } = this.props;
    if (numberQuestion < questions.length - 1 && clicked) {
      return (
        <div>
          <button
            data-testid="btn-next"
            onClick={ this.nextQuestion }
            type="button"
          >
            Próxima
          </button>
        </div>
      );
    }
    if (numberQuestion === questions.length - 1 && clicked) {
      const { score, correct, numberOfAssertions } = this.state;
      const { location: { aboutProps: { name: { name },
        email: { email } } } } = this.props;
      return (
        <div>
          <Link
            to={ {
              pathname: '/feedback',
              aboutProps: { email,
                name,
                getGravatar: this.getGravatar,
                score,
                correct,
                numberOfAssertions,
              },
            } }
          >
            <button data-testid="btn-next" type="button">
              Próxima
            </button>
          </Link>
        </div>
      );
    }
  }

  renderAnswers() {
    const { numberQuestion } = this.state;
    const { questions } = this.props;
    if (numberQuestion < questions.length) {
      return (
        <div>
          <p data-testid="question-category">{questions[numberQuestion].category}</p>
          <p data-testid="question-text">
            {questions[numberQuestion].question }
          </p>
          {combineArray(questions, numberQuestion).map((answer, index) => {
            if (answer === questions[numberQuestion].correct_answer) {
              return (
                <button
                  name={ `${answer}` }
                  className={ this.changeClassNameCorrect() }
                  key={ answer }
                  type="button"
                  data-testid="correct-answer"
                  onClick={ this.handleOnClick }
                >
                  {answer}
                </button>
              );
            }
            return (
              <button
                name={ `${answer}` }
                className={ this.changeClassNameInCorrect() }
                key={ answer }
                type="button"
                data-testid={ `wrong-answer-${index}` }
                onClick={ this.handleOnClick }
              >
                {answer}
              </button>
            );
          })}
          {this.nextButton()}
        </div>
      );
    }
  }

  render() {
    this.addInfoToLocalStorage();
    const { score } = this.state;
    const { questions } = this.props;
    const { location: { aboutProps: { name: { name },
      email: { email } } } } = this.props;
    return (
      <>
        {this.getPerfilGravatar(email, name, score)}
        {questions && this.renderAnswers()}
      </>
    );
  }
}

Game.propTypes = {
  location: PropTypes.shape({
    aboutProps: PropTypes.shape({
      name: PropTypes.shape({
        name: PropTypes.string }),
      email: PropTypes.shape({
        email: PropTypes.string }),
      score: PropTypes.shape({
        score: PropTypes.number }),
    }),
  }).isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchQuestions: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questions.results,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (token) => dispatch(fetchQuestions(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
