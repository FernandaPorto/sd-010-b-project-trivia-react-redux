import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

import { playerLogin, addToken } from '../actions/index';

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

  componentDidMount() {
    const stats = {
      name: '',
      assertions: 0,
      score: '',
      gravatarEmail: '',
    };
    const state = { player: stats };
    localStorage.setItem('state', JSON.stringify(state));
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

  async requestToken(dispatchToken) {
    const { token } = await (await fetch('https://opentdb.com/api_token.php?command=request')).json();
    localStorage.setItem('token', token);
    dispatchToken(token);
  }

  requestGravatar(name, email) {
    const emailHash = md5(email).toString();
    const gravatarEmail = `https://www.gravatar.com/avatar/${emailHash}`;
    return {
      name,
      gravatarEmail,
    };
  }

  async handleStart(userLogin, dispatchToken) {
    const { name, email } = this.state;
    await this.requestToken(dispatchToken);
    const nameAndImgPath = this.requestGravatar(name, email);
    userLogin(nameAndImgPath);
    const stats = {
      name,
      assertions: 0,
      score: '',
      gravatarEmail: nameAndImgPath,
    };
    const state = { player: stats };
    localStorage.setItem('state', JSON.stringify(state));
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
    const { userLogin, dispatchToken } = this.props;
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
          onClick={ () => this.handleStart(userLogin, dispatchToken) }
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
  dispatchToken: (token) => dispatch(addToken(token)),
});

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
  dispatchToken: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
