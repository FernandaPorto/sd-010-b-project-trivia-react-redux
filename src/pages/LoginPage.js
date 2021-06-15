import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import Configuration from '../components/Configuration';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.configChange = this.configChange.bind(this);

    this.state = {
      config: false,
    };
  }

  configChange() {
    const { config } = this.state;
    return config ? this.setState({
      config: false,
    }) : this.setState({
      config: true,
    });
  }

  render() {
    const { config } = this.state;
    return (
      <main>
        <LoginForm config={ this.configChange } />
        {config ? <Configuration config={ this.configChange } /> : null}
      </main>
    );
  }
}

export default LoginPage;
