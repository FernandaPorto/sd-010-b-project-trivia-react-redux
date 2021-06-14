import React, { Component } from 'react';
import Inputs from '../components/Inputs';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { name, email } = this.state;

    return (
      <div>
        <Inputs
          handleOnChange={ this.handleOnChange }
          name={ name }
          email={ email }
        />
      </div>
    );
  }
}

export default Login;
