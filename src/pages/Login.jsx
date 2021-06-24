import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import md5 from 'crypto-js/md5';

import { fetchToken } from '../services/api';
import { startGameActionCreator } from '../redux/actions';
import SettingsButton from '../components/SettingsButton';
import './Login.css';

const SIX_HOURS = 21600000;

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      inputName: props.name,
      inputEmail: props.email,
      redirect: false,
    };
  }

  async componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    if (!ranking) localStorage.setItem('ranking', JSON.stringify([]));

    let token = JSON.parse(localStorage.getItem('token'));
    const now = new Date().getTime();
    if (!token || now > token.expirationTime) {
      const expirationTime = now + SIX_HOURS;
      const value = await fetchToken();
      token = { expirationTime, value };
      localStorage.setItem('token', JSON.stringify(token));
    }
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { inputName, inputEmail } = this.state;
    const { startGame } = this.props;
    const hash = md5(inputEmail).toString();
    const gravatarURL = `https://www.gravatar.com/avatar/${hash}`;
    startGame({ inputName, inputEmail, gravatarURL });
    this.setState({ redirect: true });
  }

  render() {
    const { name, email } = this.props;
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
            defaultValue={ name }
            onChange={ this.handleChange }
          />
          <input
            type="email"
            name="inputEmail"
            placeholder="E-mail"
            defaultValue={ email }
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

const mapStateToProps = ({ player }) => ({
  name: player.name,
  email: player.email,
});

const mapDispatchToProps = (dispatch) => ({
  startGame: (payload) => dispatch(startGameActionCreator(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
