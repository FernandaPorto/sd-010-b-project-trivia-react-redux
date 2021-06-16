import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  feedBack(assertions) {
    const NUMBER_THREE = 3;
    switch (true) {
    case (assertions < NUMBER_THREE):
      return <h2 data-testid="feedback-text">Podia ser melhor...</h2>;
    case (assertions >= NUMBER_THREE):
      return <h2 data-testid="feedback-text">Mandou bem!</h2>;
    default:
      return <h2>Error</h2>;
    }
  }

  render() {
    const { score, assertions } = this.props;
    return (
      <section>
        <Header />
        { this.feedBack(assertions) }
        <p>Acertos:</p>
        <p data-testid="feedback-total-question">
          {assertions}
          {' '}
        </p>
        <p>Pontos:</p>
        <p data-testid="feedback-total-score">
          {score}
        </p>
        <button type="button">VER RANKING</button>
        <Link to="/"><button type="button">JOGAR NOVAMENTE</button></Link>

      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.score.total,
  assertions: state.assertions.total,
});

Feedback.propTypes = PropTypes.shape({
  score: PropTypes.number,
  assertions: PropTypes.number,
}).isRequired;

export default connect(mapStateToProps)(Feedback);
