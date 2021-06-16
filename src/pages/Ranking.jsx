import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Ranking extends Component {
  constructor(props) {
    super(props);

    this.getPlayersToLocalStorage = this.getPlayersToLocalStorage.bind(this);
  }

  getPlayersToLocalStorage() {
    const getLocalStoragePlayers = localStorage.getItem('ranking');
    const players = JSON.parse(getLocalStoragePlayers);

    const scores = players.map((player) => player.score).sort((a, b) => b - a);
    const initialSortedArray = [...scores
      .map((score) => players.filter((player) => player.score === score))];
    const sortedPlayers = initialSortedArray.map((arr) => arr[0]);
    return sortedPlayers.map((player, index) => (
      <section key={ index }>
        <img src={ player.picture } alt={ `Avatar do jogador ${player.name}` } />
        <p data-testid={ `player-name-${index}` }>
          { player.name }
        </p>
        <p data-testid={ `player-score-${index}` }>
          { player.score }
        </p>

      </section>
    ));
  }

  render() {
    return (
      <section>
        <h2 data-testid="ranking-title">Ranking</h2>

        { this.getPlayersToLocalStorage() }
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Voltar</button>
        </Link>
      </section>
    );
  }
}
