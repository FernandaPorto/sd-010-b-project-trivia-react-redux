import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { sendTokenToRedux } from '../actions/index';

class Login extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      nome: '',
      buttonDisabled: true,
      shouldRedirect: false,
    };
  }

  getToken() {
    const { saveToken } = this.props;
    const URL = 'https://opentdb.com/api_token.php?command=request';
    fetch(URL)
      .then((response) => response.json())
      .then((data) => data.token)
      .then((token) => {
        if (!localStorage.getItem('token')) {
          localStorage.setItem('token', JSON.stringify(token));
        } else {
          localStorage.removeItem(token);
          localStorage.setItem('token', JSON.stringify(token));
        }
        return token;
      })
      .then((token) => saveToken(token))
      .then(() => this.setState({ shouldRedirect: true }));
  }

  handleChange({ name, value }) {
    this.setState({
      [name]: value,
    });

    const { nome, email } = this.state;

    if (nome.length > 0 && email.length > 0) {
      this.setState({
        buttonDisabled: false,
      });
    } else {
      this.setState({
        buttonDisabled: true,
      });
    }
  }

  render() {
    const { buttonDisabled, shouldRedirect } = this.state;
    return (
      <div>
        <section>
          <input
            type="text"
            name="nome"
            onChange={ ({ target }) => this.handleChange(target) }
            data-testid="input-player-name"
          />
          <input
            type="email"
            name="email"
            onChange={ ({ target }) => this.handleChange(target) }
            data-testid="input-gravatar-email"
          />
          <button
            type="button"
            disabled={ buttonDisabled }
            onClick={ () => this.getToken() }
            data-testid="btn-play"
          >
            Jogar
          </button>
          { shouldRedirect && <Redirect to="/gameScreen" /> }
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveToken: (token) => dispatch(sendTokenToRedux(token)),
});

Login.propTypes = {
  saveToken: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
