import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAPI } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    // const { requisitionLogin } = this.props;
    // const result = await requisitionLogin();
    // console.log(result);
  }

  async handleClick() {
    const { requisitionLogin } = this.props;
    const token = await requisitionLogin();
    localStorage.setItem('token', token.result.token);
  }

  render() {
    const { name, email } = this.state;
    // if (redirect) return <Redirect to="/settings" />;
    return (
      <form>
        <label htmlFor="name">
          Nome de jogador
          <input
            data-testid="input-player-name"
            type="text"
            name="name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            data-testid="input-gravatar-email"
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <button
          data-testid="btn-play"
          type="button"
          disabled={ !name || !email }
          onClick={ this.handleClick }
        >
          Jogar
        </button>
        <Link to="/settings">
          <button
            data-testid="btn-settings"
            type="button"
          >
            Configurações
          </button>
        </Link>
      </form>
    );
  }
}

Login.propTypes = {
  requisitionLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  requisitionLogin: () => dispatch(fetchAPI()),
});

export default connect(null, mapDispatchToProps)(Login);
