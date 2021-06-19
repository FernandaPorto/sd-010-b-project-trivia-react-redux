import React, { Component } from 'react';
import { Redirect } from 'react-router';
import LoginForms from '../components/LoginForms';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      redirectSettings: false,
    };
  }

  render() {
    const { redirectSettings } = this.state;
    if (redirectSettings) {
      return <Redirect to="/settings" />;
    }
    return (
      <section>
        <LoginForms />
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => this.setState({ redirectSettings: true }) }
        >
          Configurações
        </button>
      </section>

    );
  }
}

export default Login;
