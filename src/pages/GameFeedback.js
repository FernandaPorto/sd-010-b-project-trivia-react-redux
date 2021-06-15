import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameHeader from '../components/GameHeader';

class GameFeedback extends Component {
  render() {
    const { hits, score, history } = this.props;
    const MIN_HITS = 3;

    return (
      <div>
        <GameHeader />
        <section>
          <p data-testid="feedback-text">
            {
              hits < MIN_HITS
                ? 'Podia ser melhor...'
                : 'Mandou bem!'
            }
          </p>
          <section>
            <h1>Pontuação</h1>
            <p data-testid="feedback-total-score">
              { score }
            </p>
          </section>
          <section>
            <h1>Número de acertos</h1>
            <p data-testid="feedback-total-question">
              { hits }
            </p>
          </section>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => history.push('/') }
          >
            Jogar novamente
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ () => history.push('/ranking') }
          >
            Ver Ranking
          </button>
        </section>
      </div>
    );
  }
}

// state.user.triviaGame
const mapStateToProps = ({ user: { triviaGame: { score, hits } } }) => ({
  userScore: score,
  userHits: hits,
});

export default connect(mapStateToProps)(GameFeedback);
