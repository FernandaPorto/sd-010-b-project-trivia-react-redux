import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GameHeader from '../components/GameHeader';

class GameFeedback extends Component {
  componentDidMount() {
    const state = JSON.parse(localStorage.state);
    const { name, score, gravatarEmail } = state.player;
    const picture = `https://www.gravatar.com/avatar/${gravatarEmail}`;
    const user = { name, score, picture };
    const ranking = JSON.parse(localStorage.ranking);
    localStorage.ranking = JSON.stringify([...ranking, user]);
  }

  render() {
    const { score, history } = this.props;
    const MIN_HITS = 3;
    const { player: { assertions: hits } } = JSON.parse(localStorage.getItem('state'));
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
              { +hits }
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
