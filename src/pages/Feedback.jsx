import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { resetData } from '../actions/player';
import { enableDisable } from '../actions/controls';

const ASSERTIONS_AVG = 3;

class Feedback extends Component {
  componentDidMount() {
    const { player: { urlGravatar, score, name },
      toggleEnable } = this.props;
    const players = JSON.parse(localStorage.getItem('ranking')) || [];

    const player = {
      name,
      score,
      picture: urlGravatar,
    };

    players.push(player);
    players.sort((a, b) => b.score - a.score);
    localStorage.setItem('ranking', JSON.stringify(players));
    toggleEnable(false);
  }

  componentWillUnmount() {
    const { dataReset } = this.props;
    dataReset();
  }

  render() {
    const { player: { assertions, score } } = this.props;
    const feedbackMessage = assertions < ASSERTIONS_AVG
      ? 'Podia ser melhor...' : 'Mandou bem!';
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          {feedbackMessage}
        </p>
        <p>
          {'Acertos: '}
          <span data-testid="feedback-total-question">{ assertions }</span>
        </p>
        <p>
          {'Score: '}
          <span data-testid="feedback-total-score">{ score }</span>
        </p>
        <Link to="/">
          <button data-testid="btn-play-again" type="button">Jogar novamente</button>
        </Link>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">Ranking</button>
        </Link>
      </div>
    );
  }
}

Feedback.propTypes = {
  player: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  ).isRequired,
  dataReset: PropTypes.func.isRequired,
  toggleEnable: PropTypes.func.isRequired,
};

const mapStateToProps = ({ player }) => ({
  player,
});

const mapDispatchToProps = (dispatch) => ({
  dataReset: (value) => dispatch(resetData(value)),
  toggleEnable: (value) => dispatch(enableDisable(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
