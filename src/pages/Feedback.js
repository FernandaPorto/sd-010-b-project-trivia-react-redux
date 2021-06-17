import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedbacks extends React.Component {
  render() {
    const { assertions, score } = this.props;
    const THREE = 3;

    return (
      <section>
        <Header />
        <span data-testid="feedback-total-question">{assertions}</span>
        {' '}
        <span data-testid="feedback-total-score">{score}</span>
        <h1 data-testid="feedback-text">
          {assertions >= THREE ? 'Mandou bem!' : 'Podia ser melhor...'}
        </h1>
        <Link to="/" data-testid="btn-play-again">Jogar novamente</Link>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedbacks.propTypes = PropTypes.shape({
  assertions: PropTypes.number,
  score: PropTypes.number,
}).isRequired;

export default connect(mapStateToProps)(Feedbacks);
