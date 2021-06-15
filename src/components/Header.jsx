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
        <div style={ { display: 'flex', justifyContent: 'space-around' } }>

          <img
            data-testid="header-profile-picture"
            height="35"
            src={ avatar }
            alt="Avatar"
          />
          <p data-testid="header-player-name">{user.user}</p>

          <p data-testid="header-score">0</p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

Header.propTypes = PropTypes.instanceOf(Object).isRequired;

export default connect(mapStateToProps)(Header);
