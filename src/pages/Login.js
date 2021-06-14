import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      email: '',
      redirect: false,
      settings: false,
    };
    this.handle = this.handle.bind(this);
    this.submit = this.submit.bind(this);
  }

  handle({ target: { id, value } }) {
    this.setState({ [id]: value });
  }

  submit() {
    const { nome, email } = this.state;
    const hash = md5(email).toString();
    localStorage.player = JSON.stringify({
      name: nome,
      gravatarEmail: `https://www.gravatar.com/avatar/${hash}`,
    });
    this.setState({ redirect: true });
  }

  render() {
    const { nome, email, redirect, settings } = this.state;
    const isValid = nome && email ? null : true;
    if (redirect) return <Redirect to="/jogo" />;
    if (settings) return <Redirect to="/settings" />;
    return (
      <div>
        <label htmlFor="nome">
          Nome:
          <input
            data-testid="input-player-name"
            id="nome"
            type="text"
            value={ nome }
            onChange={ this.handle }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            data-testid="input-gravatar-email"
            id="email"
            type="email"
            value={ email }
            onChange={ this.handle }
          />
        </label>
        <button
          onClick={ this.submit }
          disabled={ isValid }
          data-testid="btn-play"
          type="button"
        >
          Fazer login!
        </button>
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ () => this.setState({ settings: true }) }
        >
          Ir para Configurações
        </button>
      </div>
    );
  }
}

export default Login;
