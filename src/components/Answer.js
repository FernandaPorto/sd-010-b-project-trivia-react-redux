import React from 'react';
import PropTypes from 'prop-types';

class Answer extends React.Component {
  handleClick({ target }) {
    console.log(target.parentElement.children);
  }

  render() {
    const { number, results } = this.props;
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
          >
            {answer}
          </button>
        )) }
        <button
          onClick={ this.handleClick }
          type="button"
          data-testid="correct-answer"
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
