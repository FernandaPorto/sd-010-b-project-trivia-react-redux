import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getQuestions as questionsAction, login as loginAction } from '../redux/actions';
import trivia from '../trivia.png';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.emailValidation = this.emailValidation.bind(this);
    this.nameValidation = this.nameValidation.bind(this);
    this.buttonAvaliable = this.buttonAvaliable.bind(this);
    this.fetchToken = this.fetchToken.bind(this);
    // this.loginAction = this.loginAction.bind(this);
    this.state = {
      name: '',
      email: '',
      perguntas: {},
    };
  }

  emailValidation() {
    const { email } = this.state;
    if (email.match(/[a-z]+@[a-z]+.com/g)) {
      return true;
    }
    return false;
  }

  nameValidation() {
    const { name } = this.state;
    const nameNumber = 0;
    if (name.length > nameNumber) {
      return true;
    }
    return false;
  }

  buttonAvaliable() {
    if (this.emailValidation() && this.nameValidation()) {
      return true;
    }
    return false;
  }

  fetchToken() {
    const { getQuestions, login } = this.props;
    fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((response) => {
        localStorage.setItem('token', JSON.stringify(response.token));
        return fetch(`https://opentdb.com/api.php?amount=5&token=${response.token}`)
          .then((resp) => resp.json())
          .then((resp) => {
            getQuestions(resp);
            login(this.state);
          })
          .then(this.props.history.push('/jogo'));
      });
  }

  // https://opentdb.com/api.php?amount=${quantidade-de-perguntas-retornadas}&token=${seu-token-aqui}

  render() {
    return (
      <section className="login-section">
        <img src={ trivia } alt="trivia" />
        <form>
          <label htmlFor="name">
            <input
              name="name"
              type="text"
              data-testid="input-player-name"
              onChange={ (e) => this.setState({ name: e.target.value }) }
              placeholder="Nome"
            />
          </label>
          <label htmlFor="email">
            <input
              name="email"
              type="text"
              data-testid="input-gravatar-email"
              onChange={ (e) => this.setState({ email: e.target.value }) }
              placeholder="Email"
            />
          </label>
          <button
            data-testid="btn-play"
            type="button"
            disabled={ !this.buttonAvaliable() }
            onClick={ () => this.fetchToken() }
            className="play-btn"
          >
            Jogar
          </button>
        </form>
        <Link to="/config">
          <button
            type="button"
            data-testid="btn-settings"
            className="config-btn"
          >
            Configurações
          </button>
        </Link>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (e) => dispatch(loginAction(e)),
  getQuestions: (q) => dispatch(questionsAction(q)),
});

// Login.propTypes = {
//   // login: PropTypes.func.isRequired,
//   getQuestions: PropTypes.func.isRequired,
// };

export default connect(null, mapDispatchToProps)(Login);
