import React from 'react';
import { connect } from 'react-redux';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      nome: '',
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.verifyEmailAndName = this.verifyEmailAndName.bind(this);
  }

  handleChange(event) {
    const { target: { id: key, value } } = event;
    this.setState({
      [key]: value,
    },
    this.verifyEmailAndName());
  }

  verifyEmailAndName() {
    const { email, nome } = this.state;
    if (email.length && nome.length) {
      this.setState({
        disabled: false,
      });
    }
  }

  render() {
    const { email, nome, disabled } = this.state;
    return (
      <main>
        <form>
          <input
            data-testid="email-input"
            type="email"
            id="email"
            value={ email }
            onChange={ this.handleChange }
          />
          <input
            data-testid="nome-input"
            type="text"
            id="nome"
            value={ nome }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            id="button"
            disabled={ disabled }
          >
            Jogar
          </button>
        </form>
      </main>
    );
  }
}

export default connect()(Login);
