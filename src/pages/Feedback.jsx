import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GameHeader from '../components/GameHeader';

class Feedback extends Component {
  render() {
    const { assertions, score } = this.props;
    const MIN_CORRECT_ANSWERS = 3;
    return (
      <>
        <GameHeader />
        <main>
          {
            assertions < MIN_CORRECT_ANSWERS
              ? <h1 data-testid="feedback-text">Podia ser melhor...</h1>
              : <h1 data-testid="feedback-text">Mandou bem!</h1>
          }
          <label htmlFor="assertions">
            Acertos
            <h1 id="assertions" data-testid="feedback-total-question">{assertions}</h1>
          </label>
          <label htmlFor="score">
            Score
            <h1 id="score" data-testid="feedback-total-score">{score}</h1>
          </label>
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.loginReducer.assertions,
  score: state.loginReducer.score,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
