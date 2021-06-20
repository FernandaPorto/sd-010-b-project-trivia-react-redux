import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getGravatarImg from '../services/gravatarEmail';

class GameHeader extends Component {
  render() {
    const { name, gravatarEmail } = this.props;
    const { player: { score } } = JSON.parse(localStorage.getItem('state'));
    return (
      <header>
        <img
          src={ getGravatarImg(gravatarEmail) }
          alt="profile user"
          data-testid="header-profile-picture"
        />
        <h3 data-testid="header-player-name">
          {name}
        </h3>
        <p data-testid="header-score">
          {score}
        </p>
      </header>
    );
  }
}

const mapStateToProps = ({ loginReducer: { name, gravatarEmail } }) => ({
  name,
  gravatarEmail,
});

GameHeader.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(GameHeader);
