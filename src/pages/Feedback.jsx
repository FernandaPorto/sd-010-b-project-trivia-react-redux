import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import history from '../history';

class Feedback extends React.Component {
  getScore() {
    const state = JSON.parse(localStorage.getItem('state'));
    return state.player.score;
  }

  convert() {
    const { email } = this.props;
    const converted = md5(email).toString();
    return `https://www.gravatar.com/avatar/${converted}`;
  }

  render() {
    const { name, correctAnswer } = this.props;
    const three = 3;
    return (
      <>
        { correctAnswer < three
        && <span data-testid="feedback-text">Podia ser melhor...</span>}
        { correctAnswer >= three && <span data-testid="feedback-text">Mandou bem!</span>}
        <header>
          <img
            src={ this.convert() }
            alt="foto de perfil do jogador"
            data-testid="header-profile-picture"
          />
          <h3 data-testid="header-player-name">
            { name }
          </h3>

          <span data-testid="header-score">{ this.getScore() }</span>
        </header>
        <main>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => history.push('/') }
          >
            Jogar novamente
          </button>
        </main>
      </>
    );
  }
}

Feedback.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  correctAnswer: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  name: state.user.name,
  correctAnswer: state.game.correctAnswer,
});

export default connect(mapStateToProps)(Feedback);
