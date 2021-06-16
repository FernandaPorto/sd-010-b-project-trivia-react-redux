import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Ranking extends Component {
  render() {
    return (
      <section>
        <Header />
        <Link to="/">
          <button data-testid="btn-go-home" type="button">Voltar</button>
        </Link>
      </section>
    );
  }
}

export default Ranking;
