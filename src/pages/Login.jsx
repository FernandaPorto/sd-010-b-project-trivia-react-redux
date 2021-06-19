import './Login.css';

import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

import { fetchToken } from '../services/api';
import { loginActionCreator, startGameActionCreator } from '../redux/actions';
import SettingsButton from '../components/SettingsButton';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      name: '',
      email: '',
      redirect: false,
    };
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  async handleClick() {
    const { name, email } = this.state;
    const { login, startGame } = this.props;

    const gravatarURL = `https://www.gravatar.com/avatar/${md5(email).toString()}`;
    const { token } = await fetchToken();
    const ranking = JSON.parse(localStorage.getItem('ranking'));

    if (!ranking) {
      localStorage.setItem('ranking', JSON.stringify([]));
    }

    localStorage.setItem('token', token);
    login({ name, email, gravatarURL });
    startGame();
    this.setState({ redirect: true });
  }

  render() {
    const { name, email, redirect } = this.state;

    if (redirect) return <Redirect to="/game" />;

    return (
      <main>
        <div>
          <input
            type="text"
            name="name"
            placeholder=""
            onChange={ this.handleChange }
          />
          <input
            type="email"
            name="email"
            placeholder=""
            onChange={ this.handleChange }
          />
          <input
            type="button"
            value="Jogar"
            disabled={ !(name && email) }
            onClick={ this.handleClick }
          />
        </div>
        <div>
          <SettingsButton />
        </div>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(loginActionCreator(payload)),
  startGame: () => dispatch(startGameActionCreator()),
});

Login.propTypes = {
  login: PropTypes.func,
}.isRequired;

export default connect(undefined, mapDispatchToProps)(Login);
