import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Game extends React.Component {
  render() {
    const { count, name, email } = this.props;
    return (
      <>
        <img
          src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
          alt="foto"
          data-testid="header-profile-picture"
        />
        <span
          data-testid="header-player-name"
        >
          { name }
        </span>
        <span
          data-testid="header-score"
        >
          { count }
        </span>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  count: state.score,
  name: state.name,
  email: state.gravatarEmail,
});

export default connect(mapStateToProps)(Game);
