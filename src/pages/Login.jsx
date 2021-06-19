import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { func } from 'prop-types';
import { setPlayerInfo, fetchGameData } from '../actions';
import { getToken, getAnswers } from '../services/triviaApi';
import logo from '../trivia.png';
import './CSS/login.css';

class Login extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.loginForm = this.loginForm.bind(this);
    this.startGame = this.startGame.bind(this);

    this.state = {
      name: '',
      email: '',
      disabled: true,
      redirect: false,
    };
  }

  componentDidMount() {
    this.fetchToken();
  }

  async fetchToken() {
    const token = localStorage.getItem('token');
    const numChar = 64;
    if (token && token.length === numChar) {
      const { response_code: responseCode } = await getAnswers(1, token);
      if (responseCode !== 0) {
        localStorage.setItem('token', '');
      }
    } else {
      localStorage.setItem('token', '');
    }
  }

  handleChange({ target: { id, value } }) {
    this.setState({ [id]: value }, () => {
      const { name, email } = this.state;
      const regex = /\S+@\S+\.\S+/;
      if (name && regex.test(email)) {
        this.setState({ disabled: false });
      } else this.setState({ disabled: true });
    });
  }

  async startGame() {
    const { propFetchGameData, propSetPlayerInfo } = this.props;
    const { name, email } = this.state;
    const localToken = localStorage.getItem('token');
    if (!localToken) {
      const tokenObj = await getToken();
      localStorage.setItem('token', tokenObj.token);
      propFetchGameData({ numAnswer: 5, token: tokenObj.token });
    } else {
      propFetchGameData({ numAnswer: 5, token: localStorage.getItem('token') });
    }
    propSetPlayerInfo({ name, email });
    this.setState({ redirect: true });
  }

  loginForm(name, email, disabled) {
    return (
      <form>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            value={ name }
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          E-mail
          <input
            type="email"
            id="email"
            value={ email }
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ disabled }
          onClick={ this.startGame }
        >
          Jogar
        </button>
        <Link to="/settings">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurar
          </button>
        </Link>
      </form>
    );
  }

  render() {
    const { name, email, disabled, redirect } = this.state;
    return redirect ? <Redirect to="/game" /> : (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          { this.loginForm(name, email, disabled) }
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  propSetPlayerInfo: (payload) => dispatch(setPlayerInfo(payload)),
  propFetchGameData: (payload) => dispatch(fetchGameData(payload)),
});

Login.propTypes = {
  propSetPlayerInfo: func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
