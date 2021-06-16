import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import HeaderFeedback from '../components/HeaderFeedback';

class Feedback extends React.Component {
  render() {
    const { assertions, score } = this.props;
    return (
      <section>
        <h1>Feedback</h1>
        <HeaderFeedback />
        <div>
          <span>Número de acertos: </span>
          <span data-testid="feedback-total-question">{assertions}</span>
        </div>
        <div>
          <span>Pontuação final: </span>
          <span data-testid="feedback-total-score">{score}</span>
        </div>
        <button type="button" data-testid="btn-play-again">
          <Link to="/">Jogar novamente</Link>
        </button>
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
