import React from 'react';
import { connect } from 'react-redux';

class GameHeader extends React.Component {
  render() {
    return (
      <header>
        <img src="" data-testid="header-profile-picture" alt="avatar do usuário" />
        <h1 data-testid="header-player-name">Nome da Pessoa</h1>
        <h2 data-testid="header-score">Placar</h2>
      </header>
    );
  }
}

export default connect(null)(GameHeader);
