import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../redux/actions';

class Game extends React.Component {
  componentDidMount() {
    const { payload } = this.props;
    const name = localStorage.getItem('token');
    payload(name);
  }

  render() {
    const { questions, location: { aboutProps: { name: { name },
      email: { email }, score: { score } } } } = this.props;
      // console.log(questions.results.incorrect_answers);
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
        {
          !questions === false
          && questions.results.map((item, index) => (
            <div key={ index }>
              <p data-testid="question-category">{item.question}</p>
              <p data-testid="question-text">{item.category}</p>
              <button
                type="button"
                data-testid="correct-answer"
              >
                {item.correct_answer}
              </button>
              {
                item.incorrect_answers.map((incorret, position) => (
                  <button
                    type="button"
                    key={ position }
                    data-testid={ `wrong-answer-${position}` }
                  >
                    {incorret}
                  </button>
                ))
              }
            </div>
          ))
        }
      </div>
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
  token: state.token.token,
  questions: state.questions,
});

const mapDispatchToProps = (dispatch) => ({
  payload: (token) => dispatch(fetchQuestions(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
