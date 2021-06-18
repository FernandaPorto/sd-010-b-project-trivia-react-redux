import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import '../Header.css';

class Header extends Component {
  constructor(props) {
    super(props);

    this.getGravatarImage = this.getGravatarImage.bind(this);
  }

  getGravatarImage() {
    const { playerEmail } = this.props;
    return md5(playerEmail).toString();
  }

  render() {
    const { playerName, playerScore } = this.props;
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${this.getGravatarImage()}` }
          alt=""
          data-testid="header-profile-picture"
        />
        <span
          data-testid="header-player-name"
          className="configName"
        >
          {`Nome do jogador: ${playerName}`}
        </span>
        <span
          data-testid="header-score"
          className="configPontuation"
        >
          {`Pontuação: ${playerScore}`}
        </span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  playerName: state.player.name,
  playerEmail: state.player.gravatarEmail,
  playerScore: state.player.score,
});

Header.propTypes = {
  playerName: PropTypes.string.isRequired,
  playerEmail: PropTypes.string.isRequired,
  playerScore: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
