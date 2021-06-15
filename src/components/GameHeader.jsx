import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CryptoJS from 'crypto-js';

class GameHeader extends Component {
  getGravatarImg() {
    const { email } = this.props;
    const hash = CryptoJS.MD5(email);
    return `https://www.gravatar.com/avatar/${hash}`;
  }

  render() {
    const { name, score } = this.props;
    return (
      <header>
        <img
          src={ this.getGravatarImg() }
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

const mapStateToProps = (state) => ({
  name: state.loginReducer.name,
  email: state.loginReducer.gravatarEmail,
  score: state.loginReducer.score,
});

GameHeader.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(GameHeader);
