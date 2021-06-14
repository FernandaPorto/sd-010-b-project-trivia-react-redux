import React, { Component } from 'react';
import { getStorage } from '../services/token';

class Header extends Component {
  render() {
    const { gravatarEmail, name } = getStorage();
    return (
      <div>
        <img data-testid="header-profile-picture" src={ gravatarEmail } alt={ name } />
        <p data-testid="header-player-name">
          { name }
        </p>
        <p data-testid="header-score">Pontuação: 0</p>
      </div>
    );
  }
}

export default Header;
