import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class GameHeader extends Component {
  render() {
    const { email, username, score } = this.props;
    const hash = md5(email).toString();
    const src = `https://www.gravatar.com/avatar/${hash}`;
    return (
      <div>
        <img data-testid="header-profile-picture" src={ src } alt="gravatar-profile" />
        <p data-testid="header-player-name">{username}</p>
        <p data-testid="header-score">{score}</p>
      </div>
    );
  }
}

const mapStateToProps = ({ user: { username, email, triviaGame: { score } } }) => ({
  email,
  username,
  score,
});

GameHeader.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(GameHeader);
