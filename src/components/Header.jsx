import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { playerName, playerGravatar, score } = this.props;
    const hash = md5(playerGravatar).toString();
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="Avatar do jogador"
          data-testid="header-profile-picture"
          className="header-profile-picture"
        />
        <span
          data-testid="header-player-name"
          className="header-player-name"
        >
          { playerName }
          {' '}
        </span>
        <span
          data-testid="header-score"
          className="header-score"
        >
          {score}
        </span>
      </header>
    );
  }
}

Header.propTypes = {
  playerGravatar: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  playerName: state.player.playerName,
  playerImg: state.player.playerGravatar,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
