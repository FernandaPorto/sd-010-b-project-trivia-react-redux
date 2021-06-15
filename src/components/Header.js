import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getStorage } from '../services/token';

class Header extends Component {
  render() {
    const { player: { gravatarEmail, name } } = getStorage();
    const { pontuacao } = this.props;
    return (
      <div>
        <img data-testid="header-profile-picture" src={ gravatarEmail } alt={ name } />
        <p data-testid="header-player-name">
          { name }
        </p>
        <p data-testid="header-score">{ pontuacao }</p>
      </div>
    );
  }
}

Header.propTypes = {
  pontuacao: PropTypes.number.isRequired,
};

export default Header;
