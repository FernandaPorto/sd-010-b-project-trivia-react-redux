import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends React.Component {
  render() {
    const { assertions, score } = this.props;
    return (
      <section>
        <h1>Feedback</h1>
        <p data-testid="feedback-text">oi</p>
        <div>
          <span>Número de acertos: </span>
          <span data-testid="feedback-total-question">{assertions}</span>
        </div>
        <div>
          <span>Pontuação final: </span>
          <span data-testid="feedback-total-score">{score}</span>
        </div>
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
