import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class GameHeader extends React.Component {
  render() {
    const { name, gravatarEmail, score } = this.props;

    return (
      <header>
        <span data-testid="header-player-name">
          { name }
        </span>
        <img
          src={ gravatarEmail }
          alt="Foto de perfil do usuário"
          data-testid="header-profile-picture"
        />
        <span data-testid="header-score">
          { score }
        </span>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  const { player: { name, gravatarEmail, score } } = state;
  return { name, gravatarEmail, score };
};

GameHeader.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(GameHeader);
