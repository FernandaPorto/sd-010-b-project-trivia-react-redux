import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { enableDisable } from '../actions/controls';

class ButtonFeedback extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { state: { player: { urlGravatar, score, name } },
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

  render() {
    const { state: { controls: { disable, timer } } } = this.props;
    if (disable || !timer) {
      return (
        <Link to="/feedback">
          <button
            type="button"
            // disabled={ !disable }
            // onClick={ this.handleClick }
            data-testid="btn-next"
          >
            Resultado
          </button>
        </Link>
      );
    }
    return null;
  }
}

ButtonFeedback.propTypes = {
  state: PropTypes.objectOf(
    PropTypes.any,
  ).isRequired,
  toggleEnable: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ state });

const mapDispatchToProps = (dispatch) => ({
  toggleEnable: (value) => dispatch(enableDisable(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonFeedback);
