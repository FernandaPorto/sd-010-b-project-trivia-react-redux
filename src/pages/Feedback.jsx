import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const THREE_POINTS = 3;

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToLogin: false,
    };

    this.redirectToLogin = this.redirectToLogin.bind(this);
  }

  redirectToLogin() {
    this.setState({
      redirectToLogin: true,
    });
  }

  render() {
    const { gravatarEmail, name, score, assertions } = this.props;
    const { redirectToLogin } = this.state;

    if (redirectToLogin) {
      return (
        <Redirect to="/" />
      );
    }

    return (
      <main>
        <img src={ gravatarEmail } alt={ name } data-testid="header-profile-picture" />
        <h2 data-testid="header-player-name">{ name }</h2>
        <h3 data-testid="header-score">{ score }</h3>
        <h3 data-testid="feedback-text">
          { assertions >= THREE_POINTS ? 'Mandou bem!' : 'Podia ser melhor...' }
        </h3>
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <button
          type="button"
          onClick={ this.redirectToLogin }
          data-testid="btn-play-again"
        >
          Jogar novamente
        </button>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  const { player: { gravatarEmail, name, score, assertions } } = state;
  return {
    name,
    score,
    gravatarEmail,
    assertions,
  };
};

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
