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
          <h4 data-testid="header-player-name">{playerName}</h4>
        </div>
        {/* store será obtido da store ou do localStorage */}
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
