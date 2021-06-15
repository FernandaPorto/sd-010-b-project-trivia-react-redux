import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { addToken, inputEmail, inputUsername } from '../actions';
import getToken from '../services/trivia';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      start: false,
    };
    this.updateToken = this.updateToken.bind(this);
  }

  componentDidMount() {
    getToken().then((token) => this.setState({ token }));
  }

  handleOnSubmit(event) {
    event.preventDefault();
  }

  updateToken() {
    const { setToken } = this.props;
    const { token } = this.state;
    this.setState({ start: true });
    setToken(token);
    localStorage.token = token;
  }

  localstorageSaveUserInfo() {
    const { username, email } = this.props;
  }

  render() {
    const { start } = this.state;
    const { username, email, changeEmail, changeUsername } = this.props;
    const isValid = username && email ? null : true;
    if (start) return <Redirect to="/game" />;
    return (
      <form onSubmit={ this.handleOnSubmit }>
        <input
          data-testid="input-player-name"
          type="text"
          name="name"
          placeholder="Input your name"
          value={ username }
          onChange={ (event) => changeUsername(event.target.value) }
        />
        <input
          data-testid="input-gravatar-email"
          type="email"
          name="email"
          placeholder="Input your email"
          value={ email }
          onChange={ (event) => changeEmail(event.target.value) }
        />
        <button
          data-testid="btn-play"
          type="submit"
          disabled={ isValid }
          onClick={ this.updateToken }
        >
          Jogar
        </button>
      </form>
    );
  }
}

const mapStateToProps = ({ user: { username, email } }) => ({
  username,
  email,
});

const mapDispatchToProps = (dispatch) => ({
  setToken: (token) => dispatch(addToken(token)),
  changeEmail: (email) => dispatch(inputEmail(email)),
  changeUsername: (username) => dispatch(inputUsername(username)),
});

Login.propTypes = {
  name: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
