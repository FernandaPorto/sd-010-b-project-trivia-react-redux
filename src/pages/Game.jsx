import React from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions } from '../redux/actions';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      numberQuestion: 0,
    };
    this.getPerfilGravatar = this.getPerfilGravatar.bind(this);
    this.renderAnswers = this.renderAnswers.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    const { fetchQuestions: getQuestions } = this.props;
    const token = localStorage.getItem('token');
    getQuestions(token);
  }

  getPerfilGravatar() {
    const { location: { aboutProps: { name: { name },
      email: { email }, score: { score } } } } = this.props;
    const convert = md5(email).toString();
    const endpoint = `https://www.gravatar.com/avatar/${convert}`;

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

  handleOnClick({ target: { name } }) {
    const { numberQuestion } = this.state;
    const { questions } = this.props;
    if (name === questions[numberQuestion].correct_answer) {
      console.log('Acertou miseravel');
    }
  }

  nextQuestion() {
    const { numberQuestion } = this.state;
    this.setState({
      numberQuestion: numberQuestion + 1,
    });
  }

  renderAnswers() {
    const { numberQuestion } = this.state;
    const { questions } = this.props;
    const array = [questions[numberQuestion].correct_answer,
      ...questions[numberQuestion].incorrect_answers];
    const magicNumber = 0.5;
    const answers = array.sort(() => Math.random() - magicNumber);
    return (
      <div>
        <p data-testid="question-category">{questions[numberQuestion].category}</p>
        <p data-testid="question-text">
          {questions[numberQuestion].question }
          {' '}
        </p>
        {
          answers.map((answer, index) => {
            if (answer === questions[numberQuestion].correct_answer) {
              return (
                <button
                  name={ `${answer}` }
                  className={ `${numberQuestion}-button-correct` }
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
                key={ answer }
                type="button"
                data-testid={ `wrong-answer-${index}` }
                onClick={ this.handleOnClick }
              >
                {answer}
              </button>
            );
          })
        }
        <div>

          <button onClick={ this.nextQuestion } type="button">Proxima</button>
        </div>
      </div>
    );
  }

  render() {
    const { questions } = this.props;
    return (
      <>
        {this.getPerfilGravatar()}
        {questions && this.renderAnswers()}
      </>
    );
  }
}

Game.propTypes = {
  location: PropTypes.shape({
    aboutProps: PropTypes.shape({
      name: PropTypes.shape({
        name: PropTypes.string,
      }),
      email: PropTypes.shape({
        email: PropTypes.string,
      }),
      score: PropTypes.shape({
        score: PropTypes.number,
      }),
    }),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questions.results,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (token) => dispatch(fetchQuestions(token)),
});

Game.propTypes = ({
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchQuestions: PropTypes.func.isRequired,
});
export default connect(mapStateToProps, mapDispatchToProps)(Game);
