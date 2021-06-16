import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends React.Component {
  feedbackMessage() {
    const { assertions } = this.props;
    let message = 'Mandou bem!';
    if (assertions <= 2) {
      message = 'Podia ser melhor...';
    }
    return <p data-testid="feedback-text">{ message }</p>;
  }

  render() {
    return (
      <section>
        <h1>Feedback</h1>
        { feedbackMessage }
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
