import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.verifyGameLogin = this.verifyGameLogin.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  verifyGameLogin() {
    const { name, email } = this.state;
    return !(name && email);
  }

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <form>
          <input
            data-testid="input-player-name"
            name="name"
            value={ name }
            placeholder="Seu Nome"
            onChange={ this.handleChange }
          />
          <input
            data-testid="input-gravatar-email"
            name="email"
            value={ email }
            placeholder="Seu Email"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="btn-play"
            disabled={ this.verifyGameLogin() }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
