import React from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Game extends React.Component {
  render() {
    const { location: { aboutProps: { name: { name },
      email: { email }, score: { score } } } } = this.props;
    const convert = md5(email).toString();
    const endpoint = `https://www.gravatar.com/avatar/${convert}`;
    return (
      <div>
        <img src={ endpoint } alt={ `foto de ${name}` } />
        <span data-testid="header-player-name">
          {`Bem-vindo ${name}`}
          !
        </span>
        <span data-testid="header-profile-picture">{` Email: ${email}`}</span>
        <span data-testid="header-score">{` Pontuação: ${score}`}</span>
      </div>
    );
  }
}

Game.propTypes = {
  location: PropTypes.shape({
    aboutProps: PropTypes.shape({
      name: PropTypes.shape({
        name: PropTypes.string,
      }),
      email: PropTypes.shape({
        email: PropTypes.string,
      }),
      score: PropTypes.shape({
        score: PropTypes.number,
      }),
    }),
  }).isRequired,
};

export default Game;
