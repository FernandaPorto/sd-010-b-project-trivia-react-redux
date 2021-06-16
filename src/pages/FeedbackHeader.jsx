import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FeedbackHeader extends React.Component {
  render() {
    const { playerReducer: { gravatarEmail, name, score } } = this.props;
    return (
      <header>
        <img
          src={ gravatarEmail }
          data-testid="header-profile-picture"
          alt="avatar do usuário"
        />
        <p data-testid="header-player-name">
          Usuário:
          {name}
        </p>
        <h2 data-testid="header-score">
          {score}
        </h2>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  playerReducer: state.player,
});

export default connect(mapStateToProps)(FeedbackHeader);

FeedbackHeader.propTypes = {
  playerReducer: PropTypes.shape({
    gravatarEmail: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,
};
