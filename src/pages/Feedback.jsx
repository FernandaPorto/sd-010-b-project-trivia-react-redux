import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Feedback extends Component {
  congratulatios() {
    const { playerAssertions } = this.props;
    const minimumAssert = 3;
    if (playerAssertions < minimumAssert) {
      return ('Podia ser melhor...');
    }
    return ('Mandou bem!');
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
        <h2 data-testid="feedback-text">{ this.congratulatios() }</h2>
        <h3 data-testid="feedback-total-score">{ playerScore }</h3>
        <h3 data-testid="feedback-total-question">{ playerAssertions }</h3>
        <Link to="/" data-testid="btn-play-again">Jogar novamente</Link>
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
