import React, { Component } from 'react';
import { Redirect } from 'react-router';

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

  btnPlay() {
    this.setState({
      loginTrue: true,
    });
  }

  validateLogin() {
    const emailInput = document.getElementById('email-input').value;
    const nameInput = document.getElementById('name-input').value;
    const ONE_CHAR = 1;
    // Regex para email https://regexr.com/3e48o
    const validEmail = (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/).test(emailInput);
    const validName = nameInput.length >= ONE_CHAR;
    if (validEmail && validName) {
      // document.getElementById('formButton').disabled = false;
      this.setState({ isDisabled: false });
    } else {
      // document.getElementById('formButton').disabled = true;
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
        <fieldset>
          <input
            id="name-input"
            type="text"
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
          <button
            type="button"
            onClick={ this.btnPlay }
            data-testid="btn-play"
            disabled={ isDisabled }
          >
            Jogar

          </button>
        </fieldset>
      </form>
    );
  }
}

export default Login;
