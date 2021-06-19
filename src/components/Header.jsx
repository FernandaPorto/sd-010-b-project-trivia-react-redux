import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { saveAvatar } from '../action';

class Header extends Component {
  render() {
    const { name, gravatarEmail, score, avatar } = this.props;
    const hash = md5(gravatarEmail).toString();
    avatar(`https://www.gravatar.com/avatar/${hash}`);
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
        <p>Score:</p>
        <p data-testid="header-score">
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

const mapToDispatchProps = (dispatch) => ({
  avatar: (url) => dispatch(saveAvatar(url)),
});

Header.propTypes = {
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
  score: PropTypes.string,
  avatar: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapToDispatchProps)(Header);
