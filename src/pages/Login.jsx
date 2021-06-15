import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

import { playerLogin } from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      disabled: true,
      redirect: false,
      settings: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSettings = this.handleSettings.bind(this);
    this.handlePlay = this.handleStart.bind(this);
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

  async requestToken() {
    const { token } = await (await fetch('https://opentdb.com/api_token.php?command=request')).json();
    localStorage.setItem('token', token);
  }

  requestGravatar(name, email) {
    const emailHash = md5(email).toString();
    const imgPath = `https://www.gravatar.com/avatar/${emailHash}`;
    return {
      name,
      imgPath,
    };
  }

  async handleStart(userLogin) {
    const { name, email } = this.state;

    await this.requestToken();
    const nameAndImgPath = this.requestGravatar(name, email);

    userLogin(nameAndImgPath);
    this.setState({
      redirect: true,
    });
  }

  handleSettings() {
    this.setState({
      settings: true,
    });
  }

  render() {
    const { userLogin } = this.props;
    const { disabled, redirect, settings } = this.state;
    if (redirect) {
      return (
        <Redirect to="/start" />
      );
    }

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
          onClick={ () => this.handleStart(userLogin) }
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

const mapDispatchToProps = (dispatch) => ({
  userLogin: (userInfo) => dispatch(playerLogin(userInfo)),
});

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
