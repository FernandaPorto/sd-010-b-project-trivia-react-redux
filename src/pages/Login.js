import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { playerAction, gravatarAction } from '../actions';
import { triviaAPI } from '../Services/api';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validForm: true,
      redirect: false,
    };

    this.validateEmail = this.validateEmail.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  redirect() {
    this.setState({
      redirect: true,
    });
  }

  validateEmail(email) {
    const nameInput = document.querySelector('#name').value;
    const re = /\S+@\S+\.\S+/;
    const { playerName, playerImg } = this.props;
    playerName(nameInput);
    playerImg(email);

    if ((re.test(email)) && (nameInput.length > 0)) {
      this.setState({
        validForm: false,
      });
    }
  }

  async clickBtnJogar() {
    const { token } = await triviaAPI();
    localStorage.setItem('token', token);
  }

  render() {
    const { validForm, redirect } = this.state;

    if (redirect) {
      return <Redirect to="/configs" />;
    }

    return (
      <div className="container-login">
        <h1 className="trivia-title">Trivia</h1>
        <form className="login-form">
          <label htmlFor="name">
            NAME
            <input
              type="text"
              data-testid="input-player-name"
              id="name"
            />
          </label>
          <label htmlFor="email">
            EMAIL
            <input
              type="text"
              data-testid="input-gravatar-email"
              id="email"
              onChange={ ({ target: { value } }) => this.validateEmail(value) }
            />
          </label>
          <Link to="/jogar">
            <button
              type="submit"
              data-testid="btn-play"
              disabled={ validForm }
              onClick={ this.clickBtnJogar }
            >
              Jogar
            </button>
          </Link>
          <button
            className="button"
            type="button"
            data-testid="btn-settings"
            onClick={ () => this.redirect() }
          >
            Configurações
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  playerImg: PropTypes.func.isRequired,
  playerName: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  playerName: (name) => dispatch(playerAction(name)),
  playerImg: (email) => dispatch(gravatarAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
