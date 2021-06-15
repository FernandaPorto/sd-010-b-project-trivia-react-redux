import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { user } = this.props;
    const emailGravatar = md5(user.email).toString();
    const avatar = `https://www.gravatar.com/avatar/${emailGravatar}`;
    return (
      <header>
        <img data-testid="header-profile-picture" src={ avatar } alt="Avatar" />
        <h1 data-testid="header-player-name">{ user.user }</h1>

        <h2 data-testid="header-score">0</h2>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

Header.propTypes = {
  user: PropTypes.objetc,
}.isRequired;

export default connect(mapStateToProps)(Header);
