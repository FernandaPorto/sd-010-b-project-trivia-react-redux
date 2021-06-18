import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '', // 'Vinicius Alves da Rocha',
      email: '', // 'vinialvesrocha@gmail.com',
    };
    this.handle = this.handle.bind(this);
  }

  getToken() {
    fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((responseToken) => {
        if (!localStorage.getItem('token')) {
          localStorage.setItem('token', JSON.stringify(responseToken.token));
          console.log(localStorage.getItem('token'));
        }
      });
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
        <Link onClick={ this.getToken() } to="/game">
          <button
            data-testid="btn-play"
            type="submit"
            disabled={ (!name || !email) ? true : false }
          >
            Login
          </button>
        </Link>

        <Link to="/settings">
          <button data-testid="btn-settings" type="button">Settings</button>
        </Link>
      </>
    );
  } 
}
/*  */
/*  */
export default Login;