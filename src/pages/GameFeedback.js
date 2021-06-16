import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GameHeader from '../components/GameHeader';

class GameFeedback extends Component {
  render() {
    const { hits, score, history } = this.props;
    const MIN_HITS = 3;
    console.log(hits);
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

GameFeedback.propTypes = {
  hits: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

// state.user.triviaGame
const mapStateToProps = ({ user: { triviaGame: { score, hits } } }) => ({
  score,
  hits,
});

export default connect(mapStateToProps)(GameFeedback);
