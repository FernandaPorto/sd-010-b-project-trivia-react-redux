import React, { Component } from 'react';

export default class Login extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      nome: '',
      buttonDisabled: true,
    };
  }

  handleChange({ name, value }) {
    this.setState({
      [name]: value,
    });

    const { nome, email } = this.state;

    if (nome.length > 0 && email.length > 0) {
      this.setState({
        buttonDisabled: false,
      });
    } else {
      this.setState({
        buttonDisabled: true,
      });
    }
  }

  render() {
    const { buttonDisabled } = this.state;
    return (
      <div>
        <section>
          <input
            type="text"
            name="nome"
            onChange={ ({ target }) => this.handleChange(target) }
            data-testid="input-player-name"
          />
          <input
            type="email"
            name="email"
            onChange={ ({ target }) => this.handleChange(target) }
            data-testid="input-gravatar-email"
          />
          <button
            type="button"
            disabled={ buttonDisabled }
            data-testid="btn-play"
          >
            Jogar
          </button>
        </section>
      </div>
    );
  }
}
