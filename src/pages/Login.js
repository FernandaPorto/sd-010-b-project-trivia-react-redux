import React, { Component } from 'react';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isName: false,
      isEmail: false,
    };
    this.checkEmail = this.checkEmail.bind(this);
    this.checkName = this.checkName.bind(this);
  }

  checkEmail({ target: { value }) {
    const emailRegexp = RegExp(/[a-z]+@[a-z]+.com/g);
    const isEmail = emailRegexp.test(value);
    this.setState({ isEmail });
  }

  checkName({ target: { value }) {
    const LENGHT_VALID = 1;
    if (value.length >= LENGHT_VALID) this.setState({ isName: true });
  }

  render() {
    const { isEmail, isName } = this.state;
    const enableButton = isEmail && isName;
    return (
      <>
        <label htmlFor="name">
          <input
            type="text"
            name="name"
            id="name"
            data-testid="input-player-name"
            onChange={ (e) => this.checkName(e) }
          />
        </label>
        <br />
        <label htmlFor="email">
          <input
            type="text"
            name="email"
            id="email"
            data-testid="input-gravatar-email"
            onChange={ (e) => this.checkEmail(e) }
          />
        </label>
        <br />
        <button
          type="button"
          disabled={ !enableButton }
          data-testid="btn-play"
        >
          Entrar
        </button>
      </>
    );
  }
}

export default Login;
