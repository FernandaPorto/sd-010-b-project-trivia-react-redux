import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const THREE_POINTS = 3;

class Feedback extends React.Component {
  render() {
    const { gravatarEmail, name, score, assertions } = this.props;

    return (
      <main>
        <h2 data-testid="feedback-text">
          { assertions >= THREE_POINTS ? 'Mandou bem!' : 'Podia ser melhor...' }
        </h2>
        <img src={ gravatarEmail } alt={ name } data-testid="header-profile-picture" />
        <h3 data-testid="header-player-name">{ name }</h3>
        <h4 data-testid="header-score">{ score }</h4>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  const { player: { gravatarEmail, name, score, assertions } } = state;
  return {
    name,
    score,
    gravatarEmail,
    assertions,
  };
};

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
