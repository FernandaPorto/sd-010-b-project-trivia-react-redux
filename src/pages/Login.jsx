import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../trivia.png';
import '../Login.css';
import { loginPlayer } from '../actions/index';
import { fetchToken } from '../services';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { name, email } = this.state;
    const { Token, Player } = this.props;
    const nameLength = 0;
    return (
      <div className="Login">
        <div className="Login-header">
          <img src={ logo } className="Login-logo" alt="logo" />
          <form>
            <label data-testid="input-player-name" htmlFor="name">
              Nome
              <input id="name" name="name" type="text" onChange={ this.handleChange } />
            </label>
            <label data-testid="input-gravatar-email" htmlFor="email">
              Email
              <input
                type="email"
                name="email"
                onChange={ this.handleChange }
                id="email"
              />
            </label>
            <Link to="/quiz">
              <button
                type="button"
                data-testid="btn-play"
                disabled={
                  !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email)
                  || name.length <= nameLength
                }
                onClick={ () => { Token(); Player({ name, email }); } }
              >
                Jogar
              </button>
            </Link>
          </form>
          <div>
            <Link to="/settings">
              <button
                type="button"
                data-testid="btn-settings"
              >
                Configurações
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  Token: () => dispatch(fetchToken()),
  Player: (name, email) => dispatch(loginPlayer(name, email)),
});

Login.propTypes = {
  Token: PropTypes.func.isRequired,
  Player: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
