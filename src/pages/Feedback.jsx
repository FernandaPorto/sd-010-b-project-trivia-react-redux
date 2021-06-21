import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { totalAssertions, totalScore } = this.props;
    const gotitRightQuestions = 3;
    console.log('oi');
    return (
      <>
        <Header />
        <h1>Oi</h1>
        <h1>Página de FeedBacks</h1>
        <h2 data-testid="feedback-text">
          {totalAssertions < gotitRightQuestions
            ? 'Podia ser melhor...' : 'Mandou bem!'}
        </h2>
        <h3 data-testid="feedback-total-score">{totalScore}</h3>
        <h4 data-testid="feedback-total-question">{totalAssertions}</h4>
        <h2 link to="/" data-testid="btn-play-again">Jogar novamente</h2>
        <h2 link to="/ranking" data-testid="btn-ranking">Ver Ranking</h2>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  totalAssertions: state.user.player.assertions,
  totalScore: state.user.player.score,
});

Feedback.propTypes = ({
  totalAssertions: PropTypes.number.isRequired,
  totalScore: PropTypes.number.isRequired,
});

export default connect(mapStateToProps, null)(Feedback);
