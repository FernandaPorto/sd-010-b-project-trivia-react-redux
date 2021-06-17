import React, { Component } from 'react';
import fetchGravatarImage from '../services/fetchGravatarImage';

export default class Header extends Component {
  render() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { player } = state;
    const { name, score } = player;
    return (
      <div>
        <header>
          <img
            src={ fetchGravatarImage() }
            alt="your avatar"
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{name}</p>
          <p data-testid="header-score">{score}</p>
        </header>
      </div>
    );
  }
}
