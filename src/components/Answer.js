import React from 'react';
import PropTypes from 'prop-types';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRevealed: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      isRevealed: true,
    });
  }

  render() {
    const { number, results } = this.props;
    const { isRevealed } = this.state;
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
            style={ isRevealed ? incorrectAnswerStyles : null }
          >
            {answer}
          </button>
        )) }
        <button
          onClick={ this.handleClick }
          type="button"
          data-testid="correct-answer"
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
};

export default Answer;
