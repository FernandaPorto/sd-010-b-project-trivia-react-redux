import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

export class Feedback extends Component {
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
      <div>
        <header>
          <img data-testid="header-profile-picture" src={ gravatarEmail } alt="gravatarEmail" />
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

Feedback.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default Feedback;
