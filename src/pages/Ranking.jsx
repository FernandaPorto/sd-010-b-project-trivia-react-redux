import React, { Component } from 'react';

import { Link } from 'react-router-dom';

export default class Ranking extends Component {
  render() {
    console.log('object');
    return (
      <div>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>

        <Link
          data-testid="btn-go-home"
          to="/"
        >
          Inicio
        </Link>
      </div>
    );
  }
}
