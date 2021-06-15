import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      name: '',
      email: '',
      disabled: true,
    };
  }

  handleChange({ target: { id, value } }) {
    this.setState({ [id]: value }, () => {
      const { name, email } = this.state;
      const regex = /\S+@\S+\.\S+/;
      if (name && regex.test(email)) {
        this.setState({ disabled: false });
      } else this.setState({ disabled: true });
    });
  }

  render() {
    const { name, email, disabled } = this.state;
    return (
      <form>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            value={ name }
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          E-mail
          <input
            type="email"
            id="email"
            value={ email }
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>
        <button type="button" data-testid="btn-play" disabled={ disabled }>
          Jogar
        </button>
      </form>
    );
  }
}

export default Login;
