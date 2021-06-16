import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FeedbackHeader from './FeedbackHeader';

class Feedback extends React.Component {
  render() {
    const {
      playerReducer: { assertions },
    } = this.props;
    const goodScore = 3;
    return (
      <main>
        <FeedbackHeader />
        {assertions >= goodScore ? (
          <h1 data-testid="feedback-text">Mandou bem!</h1>
        ) : (
          <h1 data-testid="feedback-text">Podia ser melhor...</h1>
        )}
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  playerReducer: state.player,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  playerReducer: PropTypes.shape({
    assertions: PropTypes.number.isRequired,
  }).isRequired,
};
