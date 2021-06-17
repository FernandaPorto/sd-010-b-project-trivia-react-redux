import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Feedback extends Component {
  constructor() {
    super();
    this.message = this.message.bind(this);
    this.handleBtn = this.handleBtn.bind(this);
  }

  message(status) {
    const badScore = 3;
    if (status < badScore) return 'Podia ser melhor...';
    return 'Mandou bem!';
  }

  handleBtn({ target: { className } }) {
    const { history: { push } } = this.props;
    if (className === 'btn-play-again') {
      push('/');
    } else {
      push('/ranking');
    }
  }

  render() {
    const { gravatarEmail, name, score, assertions } = this.props;
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ gravatarEmail }
            alt="Gravatar"
          />
          <h2 data-testid="header-player-name">{ name }</h2>
          <h3 data-testid="header-score">{ score }</h3>
        </header>
        <main>
          <p data-testid="feedback-text">{ this.message(assertions) }</p>
          <p data-testid="feedback-total-question">{ assertions }</p>
          <p data-testid="feedback-total-score">{ null || score}</p>
        </main>
        <div>
          <button
            data-testid="btn-play-again"
            type="button"
            className="btn-play-again"
            onClick={ (event) => { this.handleBtn(event); } }
          >
            Jogar Novamente
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            className="btn-ranking"
            onClick={ (event) => { this.handleBtn(event); } }
          >
            Ver Ranking
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { player: { name, gravatarEmail, score, assertions } } = state;
  return { name, gravatarEmail, score, assertions };
};

Feedback.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
