import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { getPlayerInfo, getTokenAPI } from '../action';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      gravatarEmail: '',
      btnEnable: true,
      login: false,
      errors: {},
    };

    this.verifyLogin = this.verifyLogin.bind(this);
    this.nameInfo = this.nameInfo.bind(this);
    this.emailInfo = this.emailInfo.bind(this);
  }

  componentWillUnmount() {
    const { savePlayerInfo } = this.props;
    const { name, gravatarEmail } = this.state;
    savePlayerInfo({ name, gravatarEmail });

    if (localStorage.getItem('ranking') === null) {
      localStorage.setItem('ranking', JSON.stringify([]));
    }

    // const ranking = JSON.parse(localStorage.getItem('ranking'));
    // const check = ranking.filter((player) => player.gravatarEmail !== gravatarEmail);
    // localStorage.setItem('ranking', JSON.stringify(check));
  }

  verifyLogin() {
    const { name, gravatarEmail } = this.state;
    const errors = {};
    if (name.length > 0 && gravatarEmail.length > 0) {
      this.setState({ btnEnable: false });
    }

    if (!/(\w+[0-9]*)+@\w+\.\w+/.test(gravatarEmail) || name.length === 0) {
      errors.errorEmail = 'Nome ou email incorreto';
      this.setState({ btnEnable: true, errors });
    }

    return this.setState({ errors });
  }

  redirectToGame() {
    this.setState({ login: true });
  }

  nameInfo() {
    const { name } = this.state;
    return (
      <label htmlFor="name">
        Nome:
        <input
          data-testid="input-player-name"
          id="name"
          name="name"
          type="text"
          value={ name }
          onChange={ ({ target }) => {
            this.setState({ name: target.value }, this.verifyLogin);
          } }
        />
      </label>
    );
  }

  emailInfo() {
    const { gravatarEmail, errors } = this.state;
    return (
      <label htmlFor="email">
        Email:
        <input
          data-testid="input-gravatar-email"
          id="email"
          name="email"
          type="text"
          value={ gravatarEmail }
          onChange={ ({ target }) => {
            this.setState({ gravatarEmail: target.value }, this.verifyLogin);
          } }
        />
        {errors.errorEmail && <span>{errors.errorEmail}</span>}
      </label>
    );
  }

  render() {
    const { btnEnable, login } = this.state;
    const { getTokenData, isQuestions } = this.props;
    if (login && isQuestions) {
      return <Redirect to="/trivia" />;
    }
    return (
      <form>
        { this.nameInfo() }
        { this.emailInfo() }

        <button
          type="button"
          disabled={ btnEnable }
          data-testid="btn-play"
          onClick={ () => {
            getTokenData();
            this.redirectToGame();
          } }
        >
          Jogar
        </button>

      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getTokenData: () => dispatch(getTokenAPI()),
  savePlayerInfo: (value) => dispatch(getPlayerInfo(value)),
});

const mapStateToProps = (state) => ({
  isQuestions: state.player.isQuestions,
});

Login.propTypes = {
  getTokenData: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
