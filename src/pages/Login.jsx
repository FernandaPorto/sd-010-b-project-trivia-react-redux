import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addUserInfo, fetchToken, resetSomething } from '../redux/actions';
import { setOnLocalStorage } from '../services/helpers/localStorage';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
    this.verifyLogin = this.verifyLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveInLocalStorage = this.saveInLocalStorage.bind(this);
  }

  componentDidMount() {
    const { tokenAPI } = this.props;
    tokenAPI();
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  verifyLogin() {
    const { name, email } = this.state;
    return !(name && email);
  }

  saveInLocalStorage() {
    const { email, name } = this.state;
    const { setUserInfo, history, tokenUser, somethingReset } = this.props;

    setUserInfo(name, email);
    const userInfo = { player: { name, gravatarEmail: email } };
    setOnLocalStorage('state', userInfo);

    somethingReset({ id: 0,
      timer: 30,
      score: 0,
      totalScore: 0,
      assertions: 0,
    });

    history.push('/game');

    const response = tokenUser.token;
    localStorage.setItem('token', response);
  }

  render() {
    const { name, email } = this.state;
    return (
      <div className="flex justify-center">
        <form className="flex justify-center">
          <input
            data-testid="input-player-name"
            name="name"
            value={ name }
            placeholder="Seu Nome"
            onChange={ this.handleChange }
          />
          <input
            data-testid="input-gravatar-email"
            type="email"
            name="email"
            value={ email }
            placeholder="Seu Email"
            onChange={ this.handleChange }
          />
          <button
            className="ring-indigo-300"
            type="button"
            data-testid="btn-play"
            disabled={ this.verifyLogin() }
            onClick={ () => this.saveInLocalStorage() }
          >
            Jogar
          </button>
          <Link to="/config">
            <button
              className="ring-indigo-300"
              type="button"
              data-testid="btn-settings"
            >
              Configurações
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tokenUser: state.loginReducer.tokenUser,
});

const mapDispatchToProps = (dispatch) => ({
  tokenAPI: () => dispatch(fetchToken()),
  setUserInfo: (username, email) => dispatch(addUserInfo(username, email)),
  somethingReset: (something) => dispatch(resetSomething(something)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  setUserInfo: PropTypes.func.isRequired,
  tokenUser: PropTypes.func.isRequired,
  tokenAPI: PropTypes.func.isRequired,
  somethingReset: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
