import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class GameHeader extends React.Component {
  render() {
    const {
      playerReducer: { gravatarEmail, name, score },
    } = this.props;
    return (
      <header>
        <img
          src={ gravatarEmail }
          data-testid="header-profile-picture"
          alt="avatar do usuário"
        />
        <p data-testid="header-player-name">{name}</p>
        <h2 data-testid="header-score">{score}</h2>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  playerReducer: state.player,
});

export default connect(mapStateToProps, null)(GameHeader);

GameHeader.propTypes = {
  playerReducer: PropTypes.shape({
    gravatarEmail: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,
};
