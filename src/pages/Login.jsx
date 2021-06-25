import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveUserInfo } from '../actions/index';
import history from '../history';
import logo from '../trivia.png';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      isDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.requestToken = this.requestToken.bind(this);
    this.sendToStorage = this.sendToStorage.bind(this);
  }

  handleButton() {
    const { name, email } = this.state;
    if (name.length <= 0 || email.length <= 0) {
      this.setState({ isDisabled: true });
    }

    if (name.length > 0 && email.length > 0) {
      this.setState({ isDisabled: false });
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value }, this.handleButton);
  }

  sendToStorage() {
    const { name, email } = this.state;
    localStorage.setItem('state', JSON.stringify({
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    }));
    localStorage.setItem('ranking', JSON.stringify([{ name, score: 0, picture: '' }]));
  }

  async requestToken() {
    const result = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await result.json(); localStorage.setItem('token', data.token);
    if (data.token) { history.push('/game'); }
  }
  // comentário pra subir pro github

  render() {
    const { state: { isDisabled, email, name }, props: { saveInfo } } = this;
    return (
      <form>
        <img src={ logo } className="App-logo" alt="logo" />
        <h6>Vamos Jogar!</h6>
        <label htmlFor="name">
          <input
            type="text"
            name="name"
            placeholder="Seu Nome"
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="email">
          <input
            type="email"
            name="email"
            placeholder="Seu Email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>

        <button
          type="button"
          data-testid="btn-play"
          disabled={ isDisabled }
          onClick={ () => {
            saveInfo(email, name); this.sendToStorage(); this.requestToken();
          } }
        >
          Jogar
        </button>

        <Link to="/config">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>
      </form>
    );
  }
}
Login.propTypes = {
  saveInfo: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveInfo: (email, name) => dispatch(saveUserInfo(email, name)),
});

export default connect(null, mapDispatchToProps)(Login);
