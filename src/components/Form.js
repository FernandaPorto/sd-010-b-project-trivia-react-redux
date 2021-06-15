import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginAction, requestAction } from '../actions/gameAction';

class Form extends Component {
  constructor() {
    super();

    this.apiRequest = this.apiRequest.bind(this);

    this.state = {
      active: true,
      email: '',
      nome: '',
    };
  }

  validateEmail(mail) {
    const format = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    // Alessandra passou o Regex que ela utilizou no projeto dela.
    if (mail.match(format)) {
      return true;
    }
    return false;
  }

  validateEmailAndPassword() {
    const { email, nome } = this.state;
    if (this.validateEmail(email) === true && nome) {
      this.setState({
        active: false,
      });
    } else {
      this.setState({
        active: true,
      });
    }
  }

  handleChange({ target: { id, value } }) {
    this.setState({ [id]: value }, () => this.validateEmailAndPassword());
  }

  async apiRequest() {
    const { login, history, request } = this.props;
    const { email, nome } = this.state;
    const result = await fetch('https://opentdb.com/api_token.php?command=request').then((resolve) => resolve.json());
    localStorage.setItem('token', result.token);
    login(nome, email);
    const api = await fetch(`https://opentdb.com/api.php?amount=5&token=${result.token}`);
    const { results } = await api.json();
    request(results);
    history.push('/game');
  }

  render() {
    const { active, nome, email } = this.state;
    return (
      <form>
        <label htmlFor="nome">
          Nome
          <input
            type="type"
            id="nome"
            value={ nome }
            onChange={ (e) => this.handleChange(e) }
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            value={ email }
            onChange={ (e) => this.handleChange(e) }
            data-testid="input-gravatar-email"
          />
        </label>

        <button
          type="button"
          data-testid="btn-play"
          disabled={ active }
          onClick={ this.apiRequest }
        >
          Jogar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (name, email) => dispatch(loginAction(name, email)),
  request: (results) => dispatch(requestAction(results)),
});

export default connect(null, mapDispatchToProps)(Form);

Form.propTypes = {
  request: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  login: PropTypes.func.isRequired,
};
