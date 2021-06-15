import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { fetchToken } from '../actions/index';

import '../App.css';
import logo from '../trivia.png';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      isDisable: false,
      settings: false,
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.goToSettings = this.goToSettings.bind(this);
  }

  validateEmail() {
    const { email, name } = this.state;

    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g; // regex source: https://qastack.com.br/programming/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a#:~:text=Entrar%20Registo-,O%20regex%20da%20senha%20deve%20conter%20pelo%20menos%20oito%20caracteres,e%20min%C3%BAsculas%20e%20caracteres%20especiais
    const four = 4;
    this.setState({ isDisable: email.match(regexEmail) && name.length > four });
  }

  handleOnChange({ target: { value, name } }) {
    this.setState({ [name]: value }, this.validateEmail());
  }

  goToSettings() {
    this.setState({ settings: true });
  }

  render() {
    const { name, email, isDisable, settings } = this.state;
    const { fetchAPIToken } = this.props;
    // console.log(IsRedirect);
    // if (IsRedirect) {
    //   return <Redirect to="/carteira" />;
    // }
    return (
      <div className="App-header">
        { settings && <Redirect to="/settings" /> }
        <img src={ logo } className="App-logo" alt="logo" />
        <form>
          <input
            name="name"
            onChange={ this.handleOnChange }
            placeholder="Nome"
            type="text"
            value={ name }
            data-testid="input-player-name"
          />
          <br />
          <input
            name="email"
            onChange={ this.handleOnChange }
            placeholder="E-mail"
            type="text"
            value={ email }
            data-testid="input-gravatar-email"
          />
          <br />
          <button
            type="button"
            // onClick={}
            disabled={ !isDisable }
            data-testid="btn-play"
            onClick={ () => fetchAPIToken() }
          >
            Jogar
          </button>
          <button
            type="button"
            onClick={ this.goToSettings }
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchAPIToken: () => dispatch(fetchToken()),
});

// const mapStateToProps = (state) => ({
//   IsRedirect: state.triviaGame.IsRedirect,
// });

Login.propTypes = {
  fetchAPIToken: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
