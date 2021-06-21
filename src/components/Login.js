import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAPI, saveName, saveEmail } from '../actions/index';

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
  }

  async handleClick() {
    const { requisitionLogin } = this.props;
    const token = await requisitionLogin();
    localStorage.setItem('token', token.result.token);
    const { name, email } = this.state;
    const { saveNameDispatch, saveEmailDispatch } = this.props;
    console.log(email);
    saveNameDispatch(name);
    saveEmailDispatch(email);
  }

  render() {
    const { name, email } = this.state;
    // if (redirect) return <Redirect to="/settings" />;
    return (
      <Form>
        <Form.Label htmlFor="name">
          Nome de jogador
          <Form.Control
            placeholder="Insira seu nome ou nickname"
            data-testid="input-player-name"
            type="text"
            name="name"
            value={ name }
            onChange={ this.handleChange }
          />
        </Form.Label>
        <Form.Label htmlFor="email">
          Email:
          <Form.Control
            placeholder="email@email.com"
            data-testid="input-gravatar-email"
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </Form.Label>
        <Link to="/gameplay">
          <button
            data-testid="btn-play"
            type="button"
            disabled={ !name || !email }
            onClick={ this.handleClick }
          >
            Jogar
          </button>
        </Link>
        <Link to="/settings">
          <button
            data-testid="btn-settings"
            type="button"
          >
            Configurações
          </button>
        </Link>
      </Form>
    );
  }
}

Login.propTypes = {
  requisitionLogin: PropTypes.func.isRequired,
  saveNameDispatch: PropTypes.func.isRequired,
  saveEmailDispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  requisitionLogin: () => dispatch(fetchAPI()),
  saveNameDispatch: (name) => dispatch(saveName(name)),
  saveEmailDispatch: (email) => dispatch(saveEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
