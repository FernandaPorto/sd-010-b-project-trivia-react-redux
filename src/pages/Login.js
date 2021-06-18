import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

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
    localStorage.state = JSON.stringify({
      player: {
        name: nome,
        gravatarEmail: `https://www.gravatar.com/avatar/${hash}`,
        score: 0,
        assertions: 0,
      },
    });
    this.setState({ redirect: true });
  }

  render() {
    const { nome, email, redirect, settings } = this.state;
    const isValid = nome && email ? null : true;
    if (redirect) return <Redirect to="/jogo" />;
    if (settings) return <Redirect to="/settings" />;
    return (
      <Form className="formsLogin">
        <Form.Label htmlFor="nome">
          Nome:
        </Form.Label>
        <Form.Control
          data-testid="input-player-name"
          id="nome"
          type="text"
          value={ nome }
          onChange={ this.handle }
        />
        <Form.Label htmlFor="email">
          Email:
        </Form.Label>
        <Form.Control
          data-testid="input-gravatar-email"
          id="email"
          type="email"
          value={ email }
          onChange={ this.handle }
        />
        <Button
          className="buttonLogin"
          variant="light"
          onClick={ this.submit }
          disabled={ isValid }
          data-testid="btn-play"
          type="button"
        >
          Fazer login!
        </Button>
        <Button
          className="buttonLogin"
          variant="light"
          data-testid="btn-settings"
          type="button"
          onClick={ () => this.setState({ settings: true }) }
        >
          Ir para Configuracoes
        </Button>
      </Form>
    );
  }
}

export default Login;
