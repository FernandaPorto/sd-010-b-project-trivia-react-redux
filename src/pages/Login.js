import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.emailValidation = this.emailValidation.bind(this);
    this.nameValidation = this.nameValidation.bind(this);
    this.buttonAvaliable = this.buttonAvaliable.bind(this);
    this.state = {
      name: '',
      email: '',
    };
  }

  emailValidation() {
    const { email } = this.state;
    if (email.match(/[a-z]+@[a-z]+.com/g)) {
      return true;
    }
    return false;
  }

  nameValidation() {
    const { name } = this.state;
    const nameNumber = 0;
    if (name.length > nameNumber) {
      return true;
    }
    return false;
  }

  buttonAvaliable() {
    if (this.emailValidation() && this.nameValidation()) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <form>
        <label htmlFor="name">
          <input
            name="name"
            type="text"
            data-testid="input-player-name"
            onChange={ (e) => this.setState({ name: e.target.value }) }
          />
        </label>
        <label htmlFor="email">
          <input
            name="email"
            type="text"
            data-testid="input-gravatar-email"
            onChange={ (e) => this.setState({ email: e.target.value }) }
          />
        </label>
        <button
          data-testid="btn-play"
          type="submit"
          disabled={ !this.buttonAvaliable() }
        >
          Jogar
        </button>
      </form>
    );
  }
}

export default Login;
