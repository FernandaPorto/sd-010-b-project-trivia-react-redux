import React from 'react';
import { connect } from 'react-redux';

class GameHeader extends React.Component {
  render() {
    const { playerReducer: { name, score, gravatarEmail } } = this.props;
    return (
      <header>
        <img src={ gravatarEmail } data-testid="header-profile-picture" alt="avatar do usuário" />
        <h1 data-testid="header-player-name">{ name }</h1>
        <h2 data-testid="header-score">{ score }</h2>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  playerReducer: state.player,
});

export default connect(mapStateToProps, null)(GameHeader);
