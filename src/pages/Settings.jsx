import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
/* import { Link } from 'react-router-dom'; */

class Settings extends Component {
  constructor() {
    super();

    this.state = {
      redirect: false,
    };

    this.redirectHome = this.redirectHome.bind(this);
  }

  redirectHome() {
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <h1 data-testid="settings-title">Configurações</h1>
        <button
          type="button"
          onClick={ this.redirectHome }
        >
          Voltar
        </button>
      </div>
    );
  }
}

export default Settings;
