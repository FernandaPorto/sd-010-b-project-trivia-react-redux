import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Configurations extends Component {
  render() {
    return (
      <section>
        <h1 data-testid="settings-title">Configurações</h1>
        <Link to="/"><button type="button">Voltar</button></Link>
      </section>
    );
  }
}

export default Configurations;
