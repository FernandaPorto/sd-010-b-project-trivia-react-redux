import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class HeaderFeedback extends React.Component {
  render() {
    const localState = JSON.parse(localStorage.getItem('state'));
    const { gravatarURL } = this.props;
    const { name, score } = localState.player;
    return (
      <header>
        <div>
          <img src={ gravatarURL } alt="player" data-testid="header-profile-picture" />
        </div>
        <div>
          <h4 data-testid="header-player-name">{name}</h4>
        </div>
        <div data-testid="header-score">{score}</div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarURL: state.player.gravatarURL,
});

HeaderFeedback.propTypes = {
  gravatarURL: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(HeaderFeedback);
