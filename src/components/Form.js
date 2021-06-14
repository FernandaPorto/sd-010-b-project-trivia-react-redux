import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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

  async apiRequest() {
    const result = await fetch('https://opentdb.com/api_token.php?command=request').then((resolve) => resolve.json());
    localStorage.setItem('token', result.token);
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
        <Link to="/game">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ active }
            onClick={ this.apiRequest }
          >
            Jogar
          </button>
        </Link>
      </form>
    );
  }
}
