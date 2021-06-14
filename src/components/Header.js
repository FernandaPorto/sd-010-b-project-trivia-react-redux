import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { emailDoUsuário, userName } = this.props;
    const hash = md5(emailDoUsuário).toString();

    return (
      <header>
        <div>
          <img
            src={
              `https://www.gravatar.com/avatar/${hash}`
            }
            alt="gravatar"
            data-testid="header-profile-picture"
          />
        </div>

        <div>
          <span data-testid="header-player-name">
            { userName }
          </span>
        </div>
        <div>
          <span data-testid="header-score"> 0 </span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  emailDoUsuário: state.player.email,
  userName: state.player.nome,
});

Header.propTypes = {
  emailDoUsuário: PropTypes.string,
  userName: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, null)(Header);
