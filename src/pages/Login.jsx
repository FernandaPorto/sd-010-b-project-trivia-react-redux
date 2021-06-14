import React, { Component } from 'react';
import { connect } from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      name: '',
      email: '',       
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    })
  }
  
  render() {
    const { name, email } = this.state;
    const nameLength = 0;
    return (
      <div>
        <label data-testid="input-player-name" htmlFor="name">Nome</label>
        <input id="name" name="name" type="text" onChange={ this.handleChange }></input>
        <label data-testid="input-gravatar-email" htmlFor="email">Email</label>
        <input type="email" name="email" onChange={ this.handleChange } id="email"></input>
        <button
          data-testid="btn-play"
          disabled={
            !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email)
            || name.length <= nameLength
          }
        >
          Jogar
        </button>
      </div>
    )
  }
}

export default connect()(Login);
