import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validForm: true,
    };
    this.validateEmail = this.validateEmail.bind(this);
  }

  validateEmail(email) {
    const nameInput = document.querySelector('#name').value;
    const re = /\S+@\S+\.\S+/;
    if ((re.test(email)) && (nameInput.length > 0)) {
      this.setState({
        validForm: false,
      });
    }
  }

  render() {
    const { validForm } = this.state;
    return (
      <form>
        <label htmlFor="name">
          NAME
<<<<<<< HEAD
          <input type="text" data-testid="input-player-name" id="name" />
=======
          <input
            type="text"
            data-testid="input-player-name"
            id="name"
            onChange={ this.validateEmail }
          />
>>>>>>> 0bbec2a589fcb0d23d50b4bf66fcb996ccdaf497
        </label>
        <label htmlFor="email">
          EMAIL
          <input
            type="text"
            data-testid="input-gravatar-email"
            id="email"
            onChange={ ({ target: { value } }) => this.validateEmail(value) }
          />
        </label>
        <button type="submit" data-testid="btn-play" disabled={ validForm }>Jogar</button>
      </form>
    );
  }
}

export default Login;
