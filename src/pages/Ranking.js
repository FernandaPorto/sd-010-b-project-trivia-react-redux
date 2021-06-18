import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { revealedAction } from '../actions/gameAction';

class Ranking extends React.Component {
  // constructor() {
  //   super();

  //   // this.handleClick = this.handleClick.bind(this);
  // }

  // handleClick() {
  //   const { dispatchRevealed } = this.props;
  //   dispatchRevealed(false);
  // }

  renderRanking(list) {
    const ordenado = list.sort((a, b) => b.score - a.score);
    return ordenado.map((user, index) => (
      <div key={ index }>
        <img src={ user.picture } alt={ user.name } />
        <span data-testid={ `player-name-${index}` }>{ user.name }</span>
        <span data-testid={ `player-score-${index}` }>{ user.score }</span>
      </div>
    ));
  }

  render() {
    const rank = JSON.parse(localStorage.getItem('ranking'));
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        { this.renderRanking(rank) }
        <Link to="/" data-testid="btn-go-home">
          <button
            type="button"
            // onClick={ this.handleClick }
          >
            Voltar
          </button>
        </Link>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchRevealed: (payload) => dispatch(revealedAction(payload)),
});

export default connect(null, mapDispatchToProps)(Ranking);

// Ranking.propTypes = {
//   dispatchRevealed: PropTypes.func.isRequired,
// };
