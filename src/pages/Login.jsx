import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { FiSettings } from 'react-icons/fi';
import LoginForms from '../components/LoginForms';
import '../login.css';

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
      <section className="login">
        <section className="login-container">
          <LoginForms />
          <button
            type="button"
            data-testid="btn-settings"
            className="settings-btn"
            onClick={ () => this.setState({ redirectSettings: true }) }
          >

            <FiSettings />
          </button>
        </section>
      </section>

    );
  }
}

export default Login;
