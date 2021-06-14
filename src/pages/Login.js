import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      isDisable: false,
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  validateEmail() {
    const { email, name } = this.state;

    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const four = 4;
    this.setState({ isDisable: email.match(regexEmail) && name.length > four });
  }

  handleOnChange({ target: { value, name } }) {
    this.setState({ [name]: value }, this.validateEmail());
  }

  render() {
    const { name, email, isDisable } = this.state;

    return (
      <div>
        <form>
          <input
            name="name"
            onChange={ this.handleOnChange }
            placeholder="Nome"
            type="text"
            value={ name }
            data-testid="input-player-name"
          />
          <input
            name="email"
            onChange={ this.handleOnChange }
            placeholder="E-mail"
            type="text"
            value={ email }
            data-testid="input-gravatar-email"
          />
          <button
            type="button"
            // onClick={}
            disabled={ !isDisable }
            data-testid="btn-play"
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}
