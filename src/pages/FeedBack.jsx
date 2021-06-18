import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class FeedBack extends Component {
  render() {
    const { totalAssertions, totalScore } = this.props;
    const corrects = 3;
    return (
      <div>
        <Header />
        <h4 data-testid="feedback-text">
          { totalAssertions < corrects ? 'Podia ser melhor...' : 'Mandou bem'}
        </h4>
        <h3>Resultado Final</h3>
        <p data-testid="feedback-total-score">
          {totalScore}
        </p>
        <p data-testid="feedback-total-question">
          {totalAssertions}
        </p>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar Novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  totalAssertions: state.player.assertions,
  totalScore: state.player.score,
});

FeedBack.propTypes = {
  totalAssertions: PropTypes.number.isRequired,
  totalScore: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(FeedBack);
