import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { score, assertions } = this.props;
    return (
      <section>
        <Header />
        <h2 data-testid="feedback-text">
          Mensagem de Feedback
        </h2>
        <p data-testid="feedback-total-question">
          {assertions}
          {' '}
        </p>
        <p data-testid="feedback-total-score">{score}</p>
        {console.log(assertions)}
        {console.log(score)}
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
