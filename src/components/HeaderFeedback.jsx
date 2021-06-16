import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { playerName, gravatarURL, score } = this.props;
    return (
      <header>
        <div>
          <img src={ gravatarURL } alt="player" data-testid="header-profile-picture" />
        </div>
        <div>
          <h1 data-testid="header-player-name">{playerName}</h1>
        </div>
        {/* store será obtido da store ou do localStorage ?? */}
        {/* aqui tera que ser atualizado com o escore do jogo após as 5 perguntas */}
        <div data-testid="header-score">{score}</div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  playerName: state.player.name,
  gravatarURL: state.player.gravatarURL,
  score: state.player.score,
});

Header.propTypes = {
  playerName: PropTypes.string.isRequired,
  gravatarURL: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
