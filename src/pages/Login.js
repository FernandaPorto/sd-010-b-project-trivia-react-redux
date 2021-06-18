import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import logo from '../LOGO.png';
import { userLogin, triviaFetching } from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      btnValidadeFields: true,
      redirect: false,
      players: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.btnValidadeFields = this.btnValidadeFields.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.emailConverter = this.emailConverter.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.btnValidadeFields());
  }

  btnValidadeFields() {
    const { name, email } = this.state;
    const emailValidate = /^[\S.]+@[a-z]+\.\w{2,3}$/g.test(email);
    const userValidate = /[0-9a-zA-Z$*&@#]{4}/.test(name);
    if (emailValidate && userValidate) {
      this.setState({
        btnValidadeFields: false,
      });
    } else {
      this.setState({
        btnValidadeFields: true,
      });
    }
  }

  emailConverter(email) {
    const hash = md5(email).toString();
    const gravatar = `https://www.gravatar.com/avatar/${hash}`;
    return gravatar;
  }

  handleClick(name, email) {
    const { players } = this.state;
    const { dispatchUserLogin, fetchingAsks } = this.props;
    dispatchUserLogin(name, email);
    fetchingAsks();
    const state = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: this.emailConverter(email),
      },
    };
    // state[`player${players}`] = player;
    localStorage.setItem('state', JSON.stringify(state));
    this.setState({
      redirect: true,
      players: players + 1,
    });
  }

  render() {
    const { name, email, btnValidadeFields, redirect } = this.state;
    if (redirect) {
      return (<Redirect to="/game" />);
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <form>
            <label htmlFor="inputName">
              Nome
              <input
                type="text"
                data-testid="input-player-name"
                id="inputName"
                onChange={ this.handleChange }
                value={ name }
                name="name"
              />
            </label>
            <label htmlFor="inputEmail">
              Email
              <input
                type="email"
                data-testid="input-gravatar-email"
                id="inputEmail"
                onChange={ this.handleChange }
                value={ email }
                name="email"
              />
            </label>
            <button
              type="button"
              disabled={ btnValidadeFields }
              onClick={ () => this.handleClick(name, email) }
              data-testid="btn-play"
            >
              JOGAR
            </button>
          </form>
          <div>
            <Link to="/settings">
              <button type="button" data-testid="btn-settings">CONFIGURAÇÕES</button>
            </Link>
          </div>
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchUserLogin: (name, email, gravatar) => (
    dispatch(userLogin(name, email, gravatar))),
  fetchingAsks: () => dispatch(triviaFetching()),
});

Login.propTypes = {
  dispatchUserLogin: PropTypes.func.isRequired,
  fetchingAsks: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
