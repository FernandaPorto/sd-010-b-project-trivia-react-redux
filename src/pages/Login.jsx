import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Inputs from '../components/Inputs';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      redirect: false,
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.redirectSettings = this.redirectSettings.bind(this);
  }

  handleOnChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  redirectSettings() {
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { name, email, redirect } = this.state;

    if (redirect) {
      return <Redirect to="/settings" />;
    }
    return (
      <div>
        <Inputs
          handleOnChange={ this.handleOnChange }
          name={ name }
          email={ email }
        />
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.redirectSettings }
        >
          Configurações
        </button>
      </div>
    );
  }
}

export default Login;
