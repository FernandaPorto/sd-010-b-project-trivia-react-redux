import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Inputs from '../components/Inputs';
import logo from '../trivia.png';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      redirect: false,
      score: 0,
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
    const { name, email, score, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/settings" />;
    }
    return (
      <div>
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <Inputs
            handleOnChange={ this.handleOnChange }
            name={ name }
            email={ email }
            score={ score }
          />
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.redirectSettings }
          >
            Configurações
          </button>
        </header>
      </div>
    );
  }
}

export default Login;
