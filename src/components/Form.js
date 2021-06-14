import React, { Component } from 'react';

export default class Form extends Component {
  constructor() {
    super();

    this.state = {
      active: true,
      email: '',
      nome: '',
    };
  }

  validateEmail(mail) {
    const format = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    // Alessandra passou o Regex que ela utilizou no projeto dela.
    if (mail.match(format)) {
      return true;
    }
    return false;
  }

  validateEmailAndPassword() {
    const { email, nome } = this.state;
    if (this.validateEmail(email) === true && nome) {
      this.setState({
        active: false,
      });
    } else {
      this.setState({
        active: true,
      });
    }
  }

  handleChange({ target: { id, value } }) {
    this.setState({ [id]: value }, () => this.validateEmailAndPassword());
  }

  render() {
    const { active, nome, email } = this.state;
    return (
      <form>
        <label htmlFor="nome">
          Nome
          <input
            type="type"
            id="nome"
            value={ nome }
            onChange={ (e) => this.handleChange(e) }
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            value={ email }
            onChange={ (e) => this.handleChange(e) }
            data-testid="input-gravatar-email"
          />
        </label>
        <button type="submit" data-testid="btn-play" disabled={ active }>
          Jogar
        </button>
      </form>
    );
  }
}
