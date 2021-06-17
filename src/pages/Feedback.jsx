import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Feedback extends Component {
  constructor() {
    super();
    this.message = this.message.bind(this);
  }

  message(status) {
    const badScore = 3;
    if (status < badScore) return 'Podia ser melhor...';
    return 'Mandou bem!';
  }

  render() {
    const { gravatarEmail, name, score, assertions } = this.props;
    return (
      <div data-testid="feedback-text">
        <header>
          <img
            data-testid="header-profile-picture"
            src={ gravatarEmail }
            alt="Gravatar"
          />
          <h2 data-testid="header-player-name">{ name }</h2>
          <h3 data-testid="header-score">{ score }</h3>
        </header>
        <section>
          <h1 data-testid="feedback-text">{ this.message(assertions) }</h1>
        </section>
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
};

export default connect(mapStateToProps)(Feedback);
