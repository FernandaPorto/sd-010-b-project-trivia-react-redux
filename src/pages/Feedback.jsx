import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FeedbackHeader from './FeedbackHeader';

class Feedback extends React.Component {
  // componentDidMount() {
  //   const estadoInicial = {
  //     player: {
  //       name: '',
  //       assertions: 0,
  //       score: 0,
  //       gravatarEmail: '',
  //     },
  //   };
  //   const estadoInicialJson = JSON.stringify(estadoInicial);
  //   localStorage.setItem('state', estadoInicialJson);

  //   const token = '';
  //   localStorage.setItem('token', token);
  // }

  render() {
    const {
      playerReducer: { assertions, score },
    } = this.props;
    const goodScore = 3;
    return (
      <main>
        <FeedbackHeader />
        {assertions >= goodScore ? (
          <h1 data-testid="feedback-text">Mandou bem!</h1>
        ) : (
          <h1 data-testid="feedback-text">Podia ser melhor...</h1>
        )}
        <h2 data-testid="feedback-total-score">{score}</h2>
        <h2 data-testid="feedback-total-question">{assertions}</h2>
        <Link to="/">
          <button type="button">Jogar novamente</button>
        </Link>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  playerReducer: state.player,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  playerReducer: PropTypes.shape({
    assertions: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,
};
