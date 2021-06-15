import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.onHandleChange = this.onHandleChange.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
    this.saveLocalStorage = this.saveLocalStorage.bind(this);

    this.state = {
      name: '',
      email: '',
    };
  }

  onHandleChange({ target }) {
    this.setState({
      [target.id]: target.value,
    });
  }

  saveLocalStorage() {
    const { name, email } = this.state;
    const testObject = { name, assertions: 0, score: 0, gravatarEmail: email };
    localStorage.setItem('player', JSON.stringify(testObject));
  }

  validateLogin() {
    const zero = 0;
    // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    // const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const re = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
    const { name, email } = this.state;
    if (name.length > zero && re.test(email)) {
      return false;
    }
    return true;
  }

  render() {
    const { config } = this.props;
    return (
      <main>
        <h1>Trivia</h1>
        <form>
          <label htmlFor="name">
            Nome
            <input
              data-testid="input-player-name"
              type="text"
              id="name"
              onChange={ this.onHandleChange }
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              data-testid="input-gravatar-email"
              type="email"
              id="email"
              onChange={ this.onHandleChange }
            />
          </label>
          <Link to="/game">
            <button
              type="button"
              data-testid="btn-play"
              disabled={ this.validateLogin() }
              onClick={ () => this.saveLocalStorage() }
            >
              Jogar
            </button>
          </Link>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => config() }
          >
            Configurar
          </button>
        </form>
      </main>
    );
  }
}

LoginForm.propTypes = {
  config: PropTypes.func,
}.isRequired;

export default LoginForm;
