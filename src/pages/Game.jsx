import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Game extends React.Component {
  convert() {
    const { email } = this.props;
    const converted = md5(email).toString();
    return `https://www.gravatar.com/avatar/${converted}`;
  }

  render() {
    const { name } = this.props;
    return (
      <>
        <img
          src={ this.convert() }
          alt="foto de perfil do jogador"
          data-testid="header-profile-picture"
        />
        <h3 data-testid="header-player-name">
          { name }
        </h3>

        <span data-testid="header-score">0</span>
      </>
    );
  }
}

Game.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  name: state.user.name,
});

export default connect(mapStateToProps)(Game);