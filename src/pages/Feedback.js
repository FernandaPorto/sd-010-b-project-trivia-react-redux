import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Feedback extends Component {
  render() {
    const { gravatar, name } = this.props;
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
            { }
          </h4>
        </header>
        <h2 data-testid="feedback-text">{ }</h2>
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
});

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  gravatar: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
