import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { playerName, playerGravatar, score, assertions } = this.props;
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
        </span>
        <span>
          Sua pontuação é:
          <span
            data-testid="header-score"
            className="header-score"
          >
            {score}
          </span>
        </span>
        <Link to="/Ranking">
          <button type="button" data-testid="btn-ranking">Ver Ranking</button>
        </Link>
        {' '}
        <span
          className="header-assertions"
        >
          { `Número de acertos atual: ${assertions}` }
        </span>
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Home</button>
        </Link>
      </header>
    );
  }
}

Header.propTypes = {
  playerGravatar: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  playerName: state.player.playerName,
  playerImg: state.player.playerGravatar,
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Header);
