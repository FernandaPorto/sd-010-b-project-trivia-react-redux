import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../node_modules/bulma/css/bulma.css';

class GameHeader extends React.Component {
  render() {
    const {
      playerReducer: { gravatarEmail, name, score },
    } = this.props;
    return (
      <header className="saiDaMargem">
        <div className="perfil">
          <img
            src={ gravatarEmail }
            data-testid="header-profile-picture"
            alt="avatar do usuário"
          />
          <span className="title is-2" data-testid="header-player-name">{name}</span>
        </div>
        <div />
        <div className="pontuacao">
          <h2
            className="title is-3"
            data-testid="header-score"
          >
            {`Pontuação atual: ${score}`}
          </h2>
        </div>
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
