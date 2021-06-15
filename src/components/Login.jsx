import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { actionLogin } from '../redux/actions/index';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDisabled: true,
      loginTrue: false,
    };
    this.validateLogin = this.validateLogin.bind(this);
    this.btnPlay = this.btnPlay.bind(this);
  }

  btnPlay() {
    const { login } = this.props;
    this.setState({
      loginTrue: true,
    });
    const email = document.getElementById('email-input').value;
    const user = document.getElementById('name-input').value;
    login({ email, user });
  }

  validateLogin() {
    const emailInput = document.getElementById('email-input').value;
    const nameInput = document.getElementById('name-input').value;
    const ONE_CHAR = 1;
    const validEmail = (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/).test(emailInput);
    const validName = nameInput.length >= ONE_CHAR;
    if (validEmail && validName) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  render() {
    const { loginTrue, isDisabled } = this.state;
    if (loginTrue) {
      return <Redirect to="/game" />;
    }

    return (
      <form>
        <fieldset>
          <input
            id="name-input"
            type="text"
            data-testid="input-player-name"
            onChange={ this.validateLogin }
            placeholder="Nome"
          />
          <input
            id="email-input"
            type="email"
            data-testid="input-gravatar-email"
            onChange={ this.validateLogin }
            placeholder="Email"
          />
          <button
            type="button"
            onClick={ this.btnPlay }
            data-testid="btn-play"
            disabled={ isDisabled }
          >
            Jogar

          </button>
          <Link to="/config">
            <button type="button" data-testid="btn-settings">Config</button>
          </Link>
        </fieldset>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(actionLogin(data)),
});

Login.propTypes = {
  login: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
