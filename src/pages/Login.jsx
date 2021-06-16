import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { sendTokenToRedux, sendEmailToRedux, sendNomeToRedux } from '../actions/index';

class Login extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      email: '',
      nome: '',
      buttonDisabled: true,
      shouldRedirect: false,
      settingRedirect: false,
    };
  }

  getToken() {
    const { saveToken } = this.props;
    const URL = 'https://opentdb.com/api_token.php?command=request';
    fetch(URL)
      .then((response) => response.json())
      .then((data) => data.token)
      .then((token) => {
        if (!localStorage.getItem('token')) {
          localStorage.setItem('token', JSON.stringify(token));
        } else {
          localStorage.removeItem(token);
          localStorage.setItem('token', JSON.stringify(token));
        }
        return token;
      })
      .then((token) => saveToken(token))
      .then(() => this.setState({ shouldRedirect: true }));
  }

  sendInfoPlayer() {
    const { saveEmail, saveNome } = this.props;
    const { email, nome } = this.state;
    saveEmail(email);
    saveNome(nome);
    const player = {
      name: nome,
      assertions: 0,
      score: 0,
      gravatarEmail: email,
    };
    localStorage.removeItem('state');
    localStorage.setItem('state', JSON.stringify(player));
  }

  handleClick() {
    this.getToken();
    this.sendInfoPlayer();
  }

  handleChange({ name, value }) {
    this.setState({
      [name]: value,
    });

    const { nome, email } = this.state;

    if (nome.length > 0 && email.length > 0) {
      this.setState({
        buttonDisabled: false,
      });
    } else {
      this.setState({
        buttonDisabled: true,
      });
    }
  }

  render() {
    const { buttonDisabled, shouldRedirect, settingRedirect } = this.state;
    return (
      <div>
        <section>
          <input
            type="text"
            name="nome"
            onChange={ ({ target }) => this.handleChange(target) }
            data-testid="input-player-name"
          />
          <input
            type="email"
            name="email"
            onChange={ ({ target }) => this.handleChange(target) }
            data-testid="input-gravatar-email"
          />
          <button
            type="button"
            disabled={ buttonDisabled }
            onClick={ () => this.handleClick() }
            data-testid="btn-play"
          >
            Jogar
          </button>
          { shouldRedirect && <Redirect to="/gameScreen" /> }
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => this.setState({ settingRedirect: true }) }
          >
            Configurações
          </button>
          { settingRedirect && <Redirect to="/setting" /> }
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveToken: (token) => dispatch(sendTokenToRedux(token)),
  saveEmail: (email) => dispatch(sendEmailToRedux(email)),
  saveNome: (nome) => dispatch(sendNomeToRedux(nome)),
});

Login.propTypes = {
  saveToken: PropTypes.func.isRequired,
  saveEmail: PropTypes.func.isRequired,
  saveNome: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
