import React, { Component } from 'react';

export default class loginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAdress: '',
      name: '',
      buttonEnabler: true,
    };

    this.validationFields = this.validationFields.bind(this);
    // this.onClick = this.onClick.bind(this);
  }

  validationFields() {
    const { emailAdress, name } = this.state;
    const number = 3;
    const emailChecker = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g;
    if (emailAdress.match(emailChecker) && name.length > number) {
      this.setState({ buttonEnabler: false });
    } else { this.setState({ buttonEnabler: true }); }
  }

  render() {
    const { name, emailAdress, buttonEnabler } = this.state;
    return (
      <div>
        <label htmlFor="name">
          <input
            id="name"
            type="text"
            data-testid="input-player-name"
            placeholder="insert your name"
            value={ name }
            onChange={ ({ target: { value } }) => {
              this.setState({ name: value });
              this.validationFields();
            } }
            required
          />
        </label>
        <div />
        <label htmlFor="email">
          <input
            id="email"
            data-testid="input-gravatar-email"
            type="email"
            placeholder="insert your email"
            value={ emailAdress }
            onChange={ ({ target: { value } }) => {
              this.setState({ emailAdress: value });
              this.validationFields();
            } }
            required
          />
        </label>

        <button
          type="button"
          id="btn-submit"
          disabled={ buttonEnabler }
          data-testid="btn-play"
        >
          Jogar
        </button>
      </div>
    );
  }
}
