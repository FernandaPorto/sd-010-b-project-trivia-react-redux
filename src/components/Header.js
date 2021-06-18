import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Container, Image } from 'react-bootstrap';
import { getStorage } from '../services/token';

class Header extends Component {
  render() {
    const { player: { gravatarEmail, name } } = getStorage();
    const { pontuacao } = this.props;
    return (
      <Container className="header-container">
        <Image
          data-testid="header-profile-picture"
          src={ gravatarEmail }
          alt={ name }
          roundedCircle
        />
        <p data-testid="header-player-name">
          { name }
        </p>
        <p id="pontuacao" data-testid="header-score">
          Score:
          {' '}
          { pontuacao }
        </p>
      </Container>
    );
  }
}

Header.propTypes = {
  pontuacao: PropTypes.number.isRequired,
};

export default Header;
