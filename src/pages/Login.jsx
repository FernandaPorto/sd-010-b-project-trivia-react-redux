import React from 'react';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      disabled: true,
      settings: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSettings = this.handleSettings.bind(this);
  }

  verifyEmail(email) {
    const format = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(format)) {
      return true;
    }
    return false;
  }

  verifyNameAndEmail() {
    const { name, email } = this.state;
    const emailIsValid = this.verifyEmail(email);

    if (name !== '' && emailIsValid) {
      this.setState({
        disabled: false,
      });
    }
  }

  handleChange(event) {
    const { target: { id, value } } = event;
    this.setState({
      [id]: value,
    },
    () => {
      this.verifyNameAndEmail();
    });
  }

  handleSettings() {
    this.setState({
      settings: true,
    });
  }

  render() {
    const { disabled, settings } = this.state;

    if (settings) {
      return (
        <Redirect to="/settings" />
      );
    }

    return (
      <section>
        <input
          type="text"
          placeholder="Nome"
          id="name"
          data-testid="input-player-name"
          onChange={ this.handleChange }
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ disabled }
        >
          Jogar
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleSettings }
        >
          Configurações
        </button>
      </section>
    );
  }
}

export default Login;
