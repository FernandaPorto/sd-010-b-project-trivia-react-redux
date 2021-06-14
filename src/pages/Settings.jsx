import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Settings extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="settings-title">Configurações</h1>
        <Link to="/">Voltar</Link>
      </div>
    );
  }
}

export default Settings;
