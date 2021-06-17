import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedbacks extends React.Component {
  render() {
    const { score, assertions } = this.props;
    const THREE = 3;

    return (
      <>
        <Header />
        <main>
          <h1 data-testid="feedback-text">
            {assertions >= THREE ? 'Mandou bem!' : 'Podia ser melhor...'}
          </h1>
          <span data-testid="feedback-total-question">{assertions}</span>
          <span data-testid="feedback-total-score">{score}</span>
        </main>
        <Link to="/" data-testid="btn-play-again">Jogar novamente</Link>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedbacks.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedbacks);
