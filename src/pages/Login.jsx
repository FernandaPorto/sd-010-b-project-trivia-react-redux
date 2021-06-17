import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

import { playerLogin, requestToken } from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      loginBtnDisabled: true,
      redirectToGame: false,
      redirectToSettings: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.redirectToGame = this.redirectToGame.bind(this);
    this.redirectToSettings = this.redirectToSettings.bind(this);
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
        loginBtnDisabled: false,
      });
    }
  }

  handleInputChange(event) {
    const { target: { id, value } } = event;
    this.setState({
      [id]: value,
    },
    () => {
      this.verifyNameAndEmail();
    });
  }

  requestUserInfo() {
    const { name, email } = this.state;

    const emailHash = md5(email).toString();
    const gravatarEmail = `https://www.gravatar.com/avatar/${emailHash}`;
    return {
      name,
      gravatarEmail,
    };
  }

  handleStart() {
    const { userLoggedIn, requestTokenAPI } = this.props;

    requestTokenAPI();
    const userInfo = this.requestUserInfo();
    userLoggedIn(userInfo);
    this.redirectToGame();
  }

  redirectToGame() {
    this.setState({
      redirectToGame: true,
    });
  }

  redirectToSettings() {
    this.setState({
      redirectToSettings: true,
    });
  }

  render() {
    const { loginBtnDisabled, redirectToGame, redirectToSettings } = this.state;
    if (redirectToGame) {
      return (
        <Redirect to="/start" />
      );
    }

    if (redirectToSettings) {
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
          onChange={ this.handleInputChange }
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          data-testid="input-gravatar-email"
          onChange={ this.handleInputChange }
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ loginBtnDisabled }
          onClick={ this.handleStart }
        >
          Jogar
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.redirectToSettings }
        >
          Configurações
        </button>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userLoggedIn: (userInfo) => dispatch(playerLogin(userInfo)),
  requestTokenAPI: () => dispatch(requestToken()),
});

Login.propTypes = {
  userLoggedIn: PropTypes.func.isRequired,
  requestTokenAPI: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
