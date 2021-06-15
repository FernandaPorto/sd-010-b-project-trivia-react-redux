import React from 'react';
import PropTypes from 'prop-types';

class Answer extends React.Component {
  handleClick() {}

  render() {
    const { number, results } = this.props;
    return (
      <div>
        { results[number]?.incorrect_answers.map((answer, idx) => (
          <button
            // data-testid={ `wrong-answer-${idx}` }
            data-testid="wrong-answer"
            type="button"
            key={ idx }
          >
            {answer}
          </button>
        )) }
        <button
          type="button"
          className="correct-answer"
          data-testid="correct-answer"
        >
          {results[number]?.correct_answer}
        </button>
        {/* <button
          type="button"
          className="correct-answer"
          data-testid="correct-answer"
          // onClick={}
        >
          Respostas
        </button>
        <button
          type="button"
          className="wrong-answer-0"
          data-testid="wrong-answer-0"
        >
          Respostas
        </button> */}
      </div>
    );
  }
}

Answer.propTypes = {
  number: PropTypes.number.isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Answer;
