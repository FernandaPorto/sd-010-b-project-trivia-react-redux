import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Feedback extends Component {
  congratulations() {
    const { playerAssertions } = this.props;
    const minimumAssert = 3;
    if (playerAssertions < minimumAssert) {
      return ('Podia ser melhor...');
    }
    return ('Mandou bem!');
  }

  addToRanking() {
    const { playerName, playerScore, playerImage } = this.props;
    if (!localStorage.ranking) {
      const player = {
        name: playerName,
        score: playerScore,
        picture: playerImage,
      };
      localStorage.setItem('ranking', JSON.stringify([player]));
    } else {
      const player = {
        name: playerName,
        score: playerScore,
        picture: playerImage,
      };
      const rankingList = JSON.parse(localStorage.getItem('ranking'));
      const newRankingList = [...rankingList, player];
      localStorage.setItem('ranking', JSON.stringify(newRankingList));
    }
  }

  render() {
    const { playerScore, playerImage, playerName, playerAssertions } = this.props;
    return (
      <div>
        <header>
          <img
            src={ playerImage }
            alt="player frame"
            data-testid="header-profile-picture"
          />
          <h4 data-testid="header-player-name">
            { playerName }
          </h4>
          <h4 data-testid="header-score">
            { playerScore }
          </h4>
        </header>
        <h2 data-testid="feedback-text">{ this.congratulations() }</h2>
        <h3 data-testid="feedback-total-score">{ playerScore }</h3>
        <h3 data-testid="feedback-total-question">{ playerAssertions }</h3>
        <Link to="/" data-testid="btn-play-again">Jogar novamente</Link>
        <Link
          to="/ranking"
          data-testid="btn-ranking"
          onClick={ this.addToRanking() }
        >
          Ver Ranking
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  playerImage: state.playerReducer.gravatar,
  playerName: state.playerReducer.nome,
  playerAssertions: state.playerReducer.assertions,
  playerScore: state.playerReducer.score,
});

Feedback.propTypes = {
  playerAssertions: PropTypes.number.isRequired,
  playerScore: PropTypes.number.isRequired,
  playerImage: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
