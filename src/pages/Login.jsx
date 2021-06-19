import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import md5 from 'crypto-js/md5';

import { fetchToken } from '../services/api';
import { loginActionCreator, startGameActionCreator } from '../redux/actions';
import SettingsButton from '../components/SettingsButton';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      inputName: '',
      inputEmail: '',
      redirect: false,
    };
  }

  async componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    let token = localStorage.getItem('token');
    if (!ranking) localStorage.setItem('ranking', JSON.stringify([]));
    if (!token) {
      token = await fetchToken();
      localStorage.setItem('token', token);
    }
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { inputName, inputEmail } = this.state;
    const { login, startGame } = this.props;
    const hash = md5(inputEmail).toString();
    const gravatarURL = `https://www.gravatar.com/avatar/${hash}`;
    login({ inputName, inputEmail, gravatarURL });
    startGame();
    this.setState({ redirect: true });
  }

  render() {
    const { inputName, inputEmail, redirect } = this.state;

    if (redirect) return <Redirect to="/game" />;

    return (
      <main id="login-page">
        <div>
          <h1>Trivia Game</h1>
        </div>
        <div id="login" className="container">
          <input
            type="text"
            name="inputName"
            placeholder="Name"
            onChange={ this.handleChange }
          />
          <input
            type="email"
            name="inputEmail"
            placeholder="E-mail"
            onChange={ this.handleChange }
          />
          <input
            type="button"
            className="button-main"
            value="Start"
            disabled={ !(inputName && inputEmail) }
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

export default connect(undefined, mapDispatchToProps)(Login);
