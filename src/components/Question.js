import React from 'react';
import PropTypes from 'prop-types';

class Question extends React.Component {
  render() {
    const { number, results } = this.props;
    if (!results[number]) {
      return <div>Carregando...</div>;
    }
    return (
      <div>
        <div data-testid="question-category">{ results[number].category }</div>
        <div data-testid="question-text">{ results[number].question }</div>
      </div>
    );
  }
}

Question.propTypes = {
  number: PropTypes.number.isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Question;
