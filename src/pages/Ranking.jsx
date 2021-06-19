import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CardList from '../components/CardList';
import { restoreFromLocalStorage } from '../functions';

export default class Ranking extends Component {
  render() {
    const ranking = restoreFromLocalStorage('ranking');
    return (
      <main>
        <h1 data-testid="ranking-title">Ranking</h1>
        <CardList ranking={ ranking } />
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Voltar ao início
          </button>
        </Link>
      </main>
    );
  }
}

// test to merge in group 33
