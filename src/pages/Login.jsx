import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { fetchToken } from '../redux/actions/tokenAction';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      invalid: true,
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateNameAndEmail = this.validateNameAndEmail.bind(this);
    this.saveToken = this.saveToken.bind(this);
  }

  validateEmail(mail) {
    const format = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (mail.match(format)) {
      return true;
    }
    return false;
  }

  validateNameAndEmail() {
    const { name, email } = this.state;
    const minLength = 1;
    if (this.validateEmail(email) === true && name.length >= minLength) {
      this.setState({
        invalid: false,
      });
    } else {
      this.setState({
        invalid: true,
      });
    }
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    }, () => this.validateNameAndEmail());
  }

  async saveToken() {
    const { fetchTokenToState } = this.props;
    await fetchTokenToState();
    const { token } = this.props;
    console.log(token);
    localStorage.setItem('token', token);
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { invalid, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/questions" />;
    }
    return (
      <form>
        <label htmlFor="name">
          Nome:
          <input
            data-testid="input-player-name"
            type="text"
            name="name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            data-testid="input-gravatar-email"
            type="email"
            name="email"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ invalid }
          onClick={ () => this.saveToken() }
        >
          Jogar
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token.token,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTokenToState: () => dispatch(fetchToken()),
});

Login.propTypes = {
  fetchTokenToState: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
