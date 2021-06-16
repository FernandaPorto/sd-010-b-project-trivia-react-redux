import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getTokenApi } from '../actions';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.setLocalStorage = this.setLocalStorage.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      name: '',
      email: '',
      redirect: false,
    };
  }

  onHandleChange({ target }) {
    this.setState({
      [target.id]: target.value,
    });
  }

  setLocalStorage() {
    const { sendTokenToLocal } = this.props;
    localStorage.setItem('token', JSON.stringify(sendTokenToLocal.token));
  }

  validateLogin() {
    const zero = 0;
    // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    // const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const re = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
    const { name, email } = this.state;
    if (name.length > zero && re.test(email)) {
      return false;
    }
    return true;
  }

  handleClick() {
    const { addToken } = this.props;
    addToken();
    localStorage.setItem('token', JSON.stringify(getTokenApi()));
    // this.setLocalStorage();
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { config } = this.props;
    const { redirect } = this.state;
    return (
      <main>
        <h1>Trivia</h1>
        <form>
          <label htmlFor="name">
            Nome
            <input
              data-testid="input-player-name"
              type="text"
              id="name"
              onChange={ this.onHandleChange }
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              data-testid="input-gravatar-email"
              type="email"
              id="email"
              onChange={ this.onHandleChange }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ this.validateLogin() }
            onClick={ this.handleClick }
          >
            Jogar
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => config() }
          >
            Configurar
          </button>
        </form>
        { redirect && <Redirect to="/game" /> }
      </main>
    );
  }
}

LoginForm.propTypes = {
  config: PropTypes.func,
  sendTokenToLocal: PropTypes.objectOf(PropTypes.arrayOf),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  addToken: () => dispatch(getTokenApi()),
});

const mapStateToProps = (state) => ({
  sendTokenToLocal: state.token.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
