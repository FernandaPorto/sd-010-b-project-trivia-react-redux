import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeStyles } from '../actions/index';

class TrueButtonIsCorrect extends Component {
  handleClick() {
    const { showColors, allowButton } = this.props;
    showColors();
    allowButton();
  }

  render() {
    const { rigth, wrong, showColors, disableButtons } = this.props;
    return (
      <div>
        <button
          type="button"
          data-testid="correct-answer"
          style={ {
            border: rigth,
          } }
          onClick={ () => this.handleClick() }
          disabled={ disableButtons }
        >
          True
        </button>
        <button
          type="button"
          data-testid="wrong-answer"
          style={ {
            border: wrong,
          } }
          onClick={ () => this.handleClick() }
          disabled={ disableButtons }
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
  disableButtons: state.gameReducer.disabledButtons,
});

TrueButtonIsCorrect.propTypes = {
  rigth: PropTypes.string.isRequired,
  wrong: PropTypes.string.isRequired,
  showColors: PropTypes.func.isRequired,
  disableButtons: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TrueButtonIsCorrect);
