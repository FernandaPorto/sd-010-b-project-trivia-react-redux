import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { actionLogin } from '../redux/actions/index';
import fetchPerguntas from '../redux/actions/perguntasThunk';

import * as fetToken from './Api';

import logo from './quizlogo1.jpeg';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDisabled: true,
      loginTrue: false,
    };
    this.validateLogin = this.validateLogin.bind(this);
    this.btnPlay = this.btnPlay.bind(this);
  }

  componentWillUnmount() {
    const { pedePerguntas } = this.props;
    pedePerguntas(localStorage.getItem('token'));
  }

  btnPlay() {
    const { login } = this.props;
    fetToken.getToken()
      .then((response) => {
        localStorage.setItem('token', `${response.token}`);
      })
      .then(() => {
        this.setState({
          loginTrue: true,
        });
      });
    const email = document.getElementById('email-input').value;
    const user = document.getElementById('name-input').value;
    localStorage.setItem('state', JSON.stringify({
      player: {
        score: 0,
        name: user,
        gravatarEmail: email,
        assertions: 0,
      },
    }));
    login({ email, user });
  }

  validateLogin() {
    const emailInput = document.getElementById('email-input').value;
    const nameInput = document.getElementById('name-input').value;
    const ONE_CHAR = 1;
    const validEmail = (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/).test(emailInput);
    const validName = nameInput.length >= ONE_CHAR;
    if (validEmail && validName) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  render() {
    const { loginTrue, isDisabled } = this.state;
    if (loginTrue) {
      return <Redirect to="/game" />;
    }

    return (
      <form>
        <fieldset className="login-card">
          <img src={ logo } className="img-logo" alt="logo" />
          <input
            id="name-input"
            data-testid="input-player-name"
            onChange={ this.validateLogin }
            placeholder="Nome"
          />
          <input
            id="email-input"
            type="email"
            data-testid="input-gravatar-email"
            onChange={ this.validateLogin }
            placeholder="Email"
          />
          <div className="buttons">
            <button
              type="button"
              onClick={ this.btnPlay }
              data-testid="btn-play"
              disabled={ isDisabled }
              className="login-button"
            >
              Jogar
            </button>
            <Link to="/config">
              <button
                type="button"
                data-testid="btn-settings"
                className="login-button"
              >
                Config
              </button>
            </Link>
          </div>
          <a href="https://br.gravatar.com/">
            Cadastre-se aqui para ter um avatar
          </a>
        </fieldset>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(actionLogin(data)),
  pedePerguntas: (token) => dispatch(fetchPerguntas(token)),
});

Login.propTypes = {
  login: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
