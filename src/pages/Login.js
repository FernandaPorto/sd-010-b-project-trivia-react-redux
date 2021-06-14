import React, { Component } from 'react';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      isDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.setDisabled = this.setDisabled.bind(this);
  }


  setDisabled() {
    this.setState((prevState) => {
      if (prevState.name.length > 0 && prevState.email.length > 0) {
        return {
          isDisabled: false,
        };
      } return {
        isDisabled: true,
      };
    });
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <main>
        <form>
          <label htmlFor="name">
            Nome do Jogador:
            <input
              type="text"
              data-testid="input-player-name"
              name="name"
              value={ name }
              onChange={ (event) => {
                this.handleChange(event);
                this.setDisabled();
              } }
            />
          </label>
          <label htmlFor="email">
            Email do Gravatar:
            <input
              type="text"
              data-testid="input-gravatar-email"
              name="email"
              value={ email }
              onChange={ (event) => {
                this.handleChange(event);
                this.setDisabled();
              } }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isDisabled }
          >
            Jogar
          </button>
        </form>
      </main>
    );
  }
}
