import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { revealedAction } from '../actions/gameAction';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { dispatchRevealed } = this.props;
    dispatchRevealed(true);
    // if (acertou) {
    //   count += 1
    // } else {
    //   coint -= 1
    // }
  }

  render() {
    const { number, results, isRevealed } = this.props;
    const incorrectAnswerStyles = { border: '3px solid rgb(255, 0, 0)' };
    const correctAnswerStyles = { border: '3px solid rgb(6, 240, 15)' };
    if (!results[number]) {
      return <div>Carregando...</div>;
    }
    return (
      <div>
        { results[number].incorrect_answers.map((answer, idx) => (
          <button
            onClick={ this.handleClick }
            data-testid={ `wrong-answer-${idx}` }
            type="button"
            key={ idx }
            disabled={ isRevealed }
            style={ isRevealed ? incorrectAnswerStyles : null }
          >
            {answer}
          </button>
        )) }
        <button
          onClick={ this.handleClick }
          type="button"
          data-testid="correct-answer"
          disabled={ isRevealed }
          style={ isRevealed ? correctAnswerStyles : null }
        >
          {results[number].correct_answer}
        </button>
      </div>
    );
  }
}

Answer.propTypes = {
  number: PropTypes.number.isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchRevealed: PropTypes.func.isRequired,
  isRevealed: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isRevealed: state.game.isRevealed,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchRevealed: (payload) => dispatch(revealedAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Answer);
