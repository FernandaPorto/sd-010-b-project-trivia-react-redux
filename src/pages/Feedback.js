import React from 'react';
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
        <h1 data-testid="feedback-text">
          {assertions >= THREE ? 'Mandou bem!' : 'Podia ser melhor...'}
        </h1>
        <p data-testid="feedback-total-score">
          {score}
        </p>
        <p data-testid="feedback-total-question">
          {assertions}
        </p>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: Number(state.player.assertions),
  score: state.player.score,
});

Feedbacks.propTypes = PropTypes.shape({
  assertions: PropTypes.number,
  score: PropTypes.number,
}).isRequired;

export default connect(mapStateToProps)(Feedbacks);
