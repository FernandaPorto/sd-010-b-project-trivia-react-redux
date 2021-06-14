import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      isDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.requestToken = this.requestToken.bind(this);
  }

  handleButton() { // checa se o estado name/email tem algum valor, para habilitar o botão de jogar
    const { name, email } = this.state;
    if (name.length <= 0 || email.length <= 0) {
      this.setState({ isDisabled: true });
    }

    if (name.length > 0 && email.length > 0) {
      this.setState({ isDisabled: false });
    }
  }

  handleChange(event) { // muda o estado conforme é inserido valores nos inputs
    this.setState({ [event.target.name]: event.target.value }, this.handleButton);
  }

  requestToken() {
    return fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((data) => localStorage.setItem('token', JSON.stringify(data)));
  }

  render() {
    const { isDisabled } = this.state;
    return (
      <>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            name="name"
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>

        <Link to="/game">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isDisabled }
            onClick={ this.requestToken }
          >
            Jogar
          </button>
        </Link>
      </>
    );
  }
}

export default Login;
