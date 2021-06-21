import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import GameHeader from '../components/GameHeader';

class Feedback extends Component {
  render() {
    const { player: { assertions, score } } = JSON.parse(localStorage.getItem('state'));
    const MIN_CORRECT_ANSWERS = 3;
    return (
      <>
        <GameHeader score={ score } />
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
          <Link to="/">
            <button type="button" data-testid="btn-play-again">
              Jogar novamente
            </button>
          </Link>
          <Link to="ranking">
            <button type="button" data-testid="btn-ranking">
              Ver Ranking
            </button>
          </Link>
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.loginReducer.assertions,
  score: state.loginReducer.score,
});

export default connect(mapStateToProps, null)(Feedback);
