import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <div>
        <img src="" data-testid="header-profile-picture" alt="avatar do usuário" />
        <h1 data-testid="header-player-name">Nome da Pessoa</h1>
        <h2 data-testid="header-score">Placar</h2>
      </div>
    );
  }
}

export default Header;
