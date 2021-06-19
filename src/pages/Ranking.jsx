import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetState } from '../action';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const arr = ranking.sort((a, b) => b.score - a.score);
    const { history, reset } = this.props;
    return (
      <section>
        <h1 data-testid="ranking-title">Ranking</h1>
        {
          arr.map((player, index) => (
            <section key={ index }>
              <img src={ player.picture } alt="avatar" />
              <span data-testid={ `player-name-${index}` }>{player.name}</span>
              <span data-testid={ `player-score-${index}` }>{player.score}</span>
            </section>
          ))
        }
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => {
            history.replace('/');
            reset();
          } }
        >
          Ir para Home
        </button>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(resetState()),
});

Ranking.propTypes = {
  history: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Ranking);
