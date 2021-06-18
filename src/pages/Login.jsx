import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '', // 'Vinicius Alves da Rocha',
      email: '', // 'vinialvesrocha@gmail.com',
    };
    this.handle = this.handle.bind(this);
  }

  handle(event) {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { name, email } = this.state;
    return (
      <>
        <form>
          <label htmlFor="name">
            Nome:
            <input
              data-testid="input-player-name"
              id="name"
              type="text"
              name="name"
              value={ name }
              onChange={ this.handle }
            />
          </label>

          <label htmlFor="email">
            E-mail:
            <input
              data-testid="input-gravatar-email"
              id="email"
              type="email"
              name="email"
              value={ email }
              onChange={ this.handle }
            />
          </label>
        </form>

        <button data-testid="btn-play" type="submit" disabled={ (!name || !email) ? true : false }>Login</button>
      </>
    );
  } 
}
/*  */
/*  */
export default Login;