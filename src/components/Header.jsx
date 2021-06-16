import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    const hash = md5(gravatarEmail).toString;
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="Avatar do jogador"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">
          Player:
          {name}
        </p>
        <p data-testid="header-score">
          Score:
          {score}
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
  score: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
