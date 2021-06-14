import React, { Component } from 'react';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.onHandleChange = this.onHandleChange.bind(this);
    this.validateLogin = this.validateLogin.bind(this);

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

  validateLogin() {
    const { name, email } = this.state;

    if (name.length > 3 && email.length > 3) {
      return false;
    }
    return true;
  }

  render() {
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
          <input
            data-testid="btn-play"
            type="button"
            value="Jogar"
            disabled={ this.validateLogin() }
          />
        </form>
      </main>
    );
  }
}

export default LoginForm;
