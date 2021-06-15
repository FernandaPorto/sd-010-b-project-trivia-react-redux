import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

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
    const { imgPath, name, score } = this.props;
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ imgPath }
            alt="gravatarEmail"
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
  const { player: { name, imgPath, score } } = state;
  return { name, imgPath, score };
};

Feedback.propTypes = {
  imgPath: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
