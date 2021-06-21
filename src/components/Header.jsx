import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './css/Header.css';

class Header extends Component {
  render() {
    const { name, score, picture } = this.props;

    return (
      <header id="header">
        <img
          id="avatar-img"
          src={ picture }
          alt="avatar"
          data-testid="header-profile-picture"
        />
        <p id="avatar-name" data-testid="header-player-name">{ name }</p>
        <p id="avatar-score" data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

const mapStateToProps = ({ player: { name, score, picture } }) => ({
  name,
  score,
  picture,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  picture: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
