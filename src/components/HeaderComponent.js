import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import './header.css';
// import { userLogin } from '../actions/index';

class HeaderComponent extends Component {
  constructor(props) {
    super(props);

    this.emailConverter = this.emailConverter.bind(this);
  }

  emailConverter() {
    const { email } = this.props;
    const hash = md5(email).toString();
    const gravatar = `https://www.gravatar.com/avatar/${hash}`;
    return gravatar;
  }

  render() {
    const { name } = this.props;
    const localStorageInfos = JSON.parse(localStorage.getItem('state'));
    const { player: { score } } = localStorageInfos;
    return (
      <header className="header-bar">
        <img
          src={ this.emailConverter() }
          alt="Profile"
          className="profile-picture"
          data-testid="header-profile-picture"
        />
        <h3 data-testid="header-player-name" className="player-name">{ name }</h3>
        <span data-testid="header-score" className="header-score">
          Score:
          {' '}
          { score }
        </span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.loginReducer.email,
  name: state.loginReducer.name,
});

HeaderComponent.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(HeaderComponent);
