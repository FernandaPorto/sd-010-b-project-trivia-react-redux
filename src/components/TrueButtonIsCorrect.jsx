import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeStyles } from '../actions/index';

class TrueButtonIsCorrect extends Component {
  render() {
    const { rigth, wrong, showColors } = this.props;
    return (
      <div>
        <button
          type="button"
          data-testid="correct-answer"
          style={ {
            border: rigth,
          } }
          onClick={ () => showColors() }
        >
          True
        </button>
        <button
          type="button"
          data-testid="wrong-answer"
          style={ {
            border: wrong,
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

export default connect(mapStateToProps, mapDispatchToProps)(TrueButtonIsCorrect);
