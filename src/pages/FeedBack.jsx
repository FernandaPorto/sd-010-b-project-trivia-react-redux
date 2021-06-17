import React, { Component } from 'react';
import { connect } from 'react-redux';
<<<<<<< HEAD
=======
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
>>>>>>> bac4ae076cddf675b2c2b101a0b67e754c74b018
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
<<<<<<< HEAD
          Pontuação Total:
          {totalScore}
        </p>
        <p data-testid="feedback-total-question">
          Total de Acertos:
          {totalAssertions}
        </p>

      </div>

=======
          {totalScore}
        </p>
        <p data-testid="feedback-total-question">
          {totalAssertions}
        </p>
        <Link to="/quiz">
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
>>>>>>> bac4ae076cddf675b2c2b101a0b67e754c74b018
    );
  }
}
const mapStateToProps = (state) => ({
  totalAssertions: state.player.assertions,
  totalScore: state.player.score,
});

<<<<<<< HEAD
=======
FeedBack.propTypes = {
  totalAssertions: PropTypes.number.isRequired,
  totalScore: PropTypes.number.isRequired,
};

>>>>>>> bac4ae076cddf675b2c2b101a0b67e754c74b018
export default connect(mapStateToProps)(FeedBack);
