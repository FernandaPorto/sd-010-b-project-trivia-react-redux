import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../App.css';
import { enableDisable, setStyle } from '../actions/controls';

const CORRECT_ANSWER = 'correct-answer';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick({ target: { name } }) {
    const { toggleEnable, calcQuestionScore, styleUpdate } = this.props;
    toggleEnable(true);
    styleUpdate({
      rightStyle: 'green-border',
      wrongStyle: 'red-border',
    });

    if (name === CORRECT_ANSWER) {
      calcQuestionScore();
    }
  }

  render() {
    const { answers, controls: { disable, rightStyle, wrongStyle } } = this.props;
    return answers.map(({ answer, name, testid, className }, index) => (
      <button
        key={ index }
        type="button"
        data-testid={ testid }
        name={ name }
        disabled={ disable }
        className={ className ? rightStyle : wrongStyle }
        onClick={ this.handleClick }
      >
        { answer }
      </button>
    ));
  }
}

Answer.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.any).isRequired,
  calcQuestionScore: PropTypes.func.isRequired,
  controls: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number,
    ]),
  ).isRequired,
  toggleEnable: PropTypes.func.isRequired,
  styleUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = ({ controls }) => ({
  controls,
});

const mapDispatchToProps = (dispatch) => ({
  toggleEnable: (value) => dispatch(enableDisable(value)),
  styleUpdate: (value) => dispatch(setStyle(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Answer);
