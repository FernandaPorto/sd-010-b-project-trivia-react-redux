import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Game extends React.Component {
  render() {
    const { name, imgPath, score } = this.props;
    return (
      <section>
        <header>
          <span data-testid="header-player-name">
            { name }
          </span>
          <img
            src={ imgPath }
            alt="Foto de perfil do usuário"
            data-testid="header-profile-picture"
          />
          <span data-testid="header-score">
            { score }
          </span>
        </header>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const { player: { name, imgPath, score } } = state;
  return { name, imgPath, score };
};

Game.propTypes = {
  name: PropTypes.string.isRequired,
  imgPath: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
