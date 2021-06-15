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
    const { disable } = this.state;
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
          <button
            type="button"
            data-testid="btn-play"
            disabled={ this.validateLogin() }
          >
            Jogar
          </button>
        </form>
      </main>
    );
  }
}

export default LoginForm;
