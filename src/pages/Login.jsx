import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import fetchURL from '../services/API';

export default class loginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAdress: '',
      name: '',
      buttonEnabler: true,
      shouldRedirect: false,
    };

    this.validationFields = this.validationFields.bind(this);
    this.onClick = this.onClick.bind(this);
    this.setToken = this.setToken.bind(this);
    this.settingsButton = this.settingsButton.bind(this);
  }

  onClick() {
    // const { emailAdress, name } = this.state;
    // const { firstDispatch } = this.props;
    // firstDispatch(emailAdress, passwordData);
    this.setState({ shouldRedirect: true });
    this.setToken();
  }

  async setToken() {
    const token = await fetchURL();
    localStorage.setItem('token', JSON.stringify(token));
  }

  settingsButton() {
    return (
      <Link to="/settings">
        <button type="button" data-testid="btn-settings">
          Configurações
        </button>
      </Link>
    );
  }

  validationFields() {
    const { emailAdress, name } = this.state;
    const number = 3;
    const emailChecker = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g;
    if (emailAdress.match(emailChecker) && name.length > number) {
      this.setState({ buttonEnabler: false });
    } else { this.setState({ buttonEnabler: true }); }
  }

  render() {
    const { name, emailAdress, buttonEnabler, shouldRedirect } = this.state;
    if (shouldRedirect) {
      return <Redirect to="/gamepage" />;
    }

    return (
      <div>
        <label htmlFor="name">
          <input
            id="name"
            type="text"
            data-testid="input-player-name"
            placeholder="insert your name"
            value={ name }
            onChange={ ({ target: { value } }) => {
              this.setState({ name: value });
              this.validationFields();
            } }
            required
          />
        </label>
        <div />
        <label htmlFor="email">
          <input
            id="email"
            data-testid="input-gravatar-email"
            type="email"
            placeholder="insert your email"
            value={ emailAdress }
            onChange={ ({ target: { value } }) => {
              this.setState({ emailAdress: value });
              this.validationFields();
            } }
            required
          />
        </label>
        <button
          type="button"
          id="btn-submit"
          disabled={ buttonEnabler }
          data-testid="btn-play"
          onClick={ () => this.onClick() }
        >
          Jogar
        </button>
        { this.settingsButton() }
      </div>
    );
  }
}
