import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import action from '../actions/index';

class Header extends Component {
  constructor(props) {
    super(props);

    this.gravatar = this.gravatar.bind(this);
  }

  gravatar() {
    const { email, srcAvatar } = this.props;
    const userEmail = md5(email).toString();
    const srcImg = `https://www.gravatar.com/avatar/${userEmail}`;
    srcAvatar({ type: 'RANKING', payload: { srcImg, srcImg } });
    return (
      <img
        alt="user"
        data-testid="header-profile-picture"
        src={ srcImg }
      />);
  }

  render() {
    const { username } = this.props;
    return (
      <header>
        <h3 data-testid="header-player-name">{username}</h3>
        <div>
          {this.gravatar()}
        </div>
        <div data-testid="header-score">0</div>
      </header>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  srcAvatar: (values) => dispatch(action(values)),
});

const MapStateToProps = (state) => ({
  email: state.login.email,
  username: state.login.name,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  srcAvatar: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default connect(MapStateToProps, mapDispatchToProps)(Header);
