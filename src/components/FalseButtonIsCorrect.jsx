import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeStyles } from '../actions/index';

class FalseButtonIsCorrect extends Component {
  render() {
    const { rigth, wrong, showColors } = this.props;
    return (
      <div>
        <button
          type="button"
          data-testid="wrong-answer"
          style={ {
            border: wrong,
          } }
          onClick={ () => showColors() }
        >
          True
        </button>
        <button
          type="button"
          data-testid="correct-answer"
          style={ {
            border: rigth,
          } }
          onClick={ () => showColors() }
        >
          False
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  showColors: () => dispatch(changeStyles()),
});

const mapStateToProps = (state) => ({
  rigth: state.gameReducer.styles.rigth,
  wrong: state.gameReducer.styles.wrong,
});

FalseButtonIsCorrect.propTypes = {
  rigth: PropTypes.string.isRequired,
  wrong: PropTypes.string.isRequired,
  showColors: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FalseButtonIsCorrect);
