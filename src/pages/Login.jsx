import React from 'react';
import { Redirect } from 'react-router';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      disabled: true,
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  verifyEmail(email) {
    const format = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(format)) {
      return true;
    }
    return false;
  }

  verifyNameAndEmail() {
    const { name, email } = this.state;
    const emailIsValid = this.verifyEmail(email);

    if (name !== '' && emailIsValid) {
      this.setState({
        disabled: false,
      });
    }
  }

  handleChange(event) {
    const { target: { id, value } } = event;
    this.setState({
      [id]: value,
    },
    () => {
      this.verifyNameAndEmail();
    });
  }

  async handleClick() {
    const { token } = await (await fetch('https://opentdb.com/api_token.php?command=request')).json();
    localStorage.setItem('token', token);
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { disabled, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/pagina" />;
    }
    return (
      <section>
        <input
          type="text"
          placeholder="Nome"
          id="name"
          data-testid="input-player-name"
          onChange={ this.handleChange }
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ disabled }
          onClick={ this.handleClick }
        >
          Jogar
        </button>
      </section>
    );
  }
}

export default Login;
