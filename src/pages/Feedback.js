import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Feedback extends Component {
  // performanceGame() {
  //   const { assertions } = this.props;
  //   const minimumHit = 3;
  //   if (assertions < minimumHit) {
  //     return <p>Podia ser melhor...</p>;
  //   } if (assertions >= minimumHit) {
  //     return <p>Mandou Bem!</p>;
  //   }
  // }

  render() {
    const minimumHit = 3;
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    console.log(ranking);
    const { gravatar, name, assertions } = this.props;
    return (
      <div>
        <header>
          <img
            src={ gravatar }
            alt="player frame"
            data-testid="header-profile-picture"
          />
          <h4 data-testid="header-player-name">
            { name }
          </h4>
          <h4 data-testid="header-score">
            { ranking[0].score }
          </h4>
        </header>
        <h2 data-testid="feedback-text">
          { assertions < minimumHit && 'Podia ser melhor...' }
        </h2>
        <h2 data-testid="feedback-text">{ assertions >= minimumHit && 'Mandou bem!' }</h2>
        <h3 data-testid="feedback-total-score">{ }</h3>
        <h3 data-testid="feedback-total-question">{ }</h3>
        <Link to="/" data-testid="btn-play-again">Jogar novamente</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.reducerName.name,
  gravatar: state.reducerName.gravatar,
  score: state.reducerName.score,
  assertions: state.reducerName.assertions,
});

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  gravatar: PropTypes.string.isRequired,
  // store: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
