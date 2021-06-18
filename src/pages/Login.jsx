import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveUserInfo } from '../actions/index';
import history from '../history';

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
  }

  componentDidMount() {
    localStorage.setItem('state', JSON.stringify({
      player: {
        name: '',
        assertions: 0,
        score: 0,
        gravatarEmail: '',
      },
      ranking: '',
      token: '',
    }));
  }

  handleButton() { // checa se o estado name/email tem algum valor, para habilitar o botão de jogar
    const { name, email } = this.state;
    if (name.length <= 0 || email.length <= 0) {
      this.setState({ isDisabled: true });
    }

    if (name.length > 0 && email.length > 0) {
      this.setState({ isDisabled: false });
    }
  }

  handleChange(event) { // muda o estado conforme é inserido valores nos inputs
    this.setState({ [event.target.name]: event.target.value }, this.handleButton);
    const state = JSON.parse(localStorage.getItem('state'));
    if (event.target.name === 'name') {
      state.player.name = event.target.value;
    }
    if (event.target.name === 'email') {
      state.player.gravatarEmail = event.target.value;
    }
    localStorage.setItem('state', JSON.stringify(state));
  }

  async requestToken() {
    // const state = JSON.parse(localStorage.getItem('state'));
    const result = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await result.json(); localStorage.setItem('token', data.token);
    // state.token = data.token;
    // localStorage.setItem('state', JSON.stringify(state));
    if (data.token) { history.push('/game'); }
  }

  render() {
    const { state: { isDisabled, email, name }, props: { saveInfo } } = this;
    return (
      <>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            name="name"
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>

        {/* <Link to="/game"> */}
        <button
          type="button"
          data-testid="btn-play"
          disabled={ isDisabled }
          onClick={ () => { this.requestToken(); saveInfo(email, name); } }
        >
          Jogar
        </button>
        {/* </Link> */}

        <Link to="/config">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>
      </>
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
