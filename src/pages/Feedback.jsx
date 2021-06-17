import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Feedback extends Component {
  constructor() {
    super();
    this.message = this.message.bind(this);
  }

  message(status) {
    const badScore = 2;
    if (status <= badScore) return 'Podia ser melhor...';
    return 'Mandou bem!';
  }

  render() {
    const { gravatarEmail, name, score } = this.props;
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
          <h1 data-testid="feedback-text">{ this.message(score) }</h1>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { player: { name, gravatarEmail, score } } = state;
  return { name, gravatarEmail, score };
};

Feedback.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
