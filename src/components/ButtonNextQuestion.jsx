import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { setToken } from '../pages/GamePage';

class ButtonNextQuestion extends React.Component {
  render() {
    const { handleChange, rightAnswer } = this.props;
    return (
      <Link to="/gamepage">
        <button type="button" disabled={ rightAnswer } onClick={ handleChange }>
          Próxima pergunta
        </button>
      </Link>
    );
  }
}

ButtonNextQuestion.propTypes = {
  handleChange: PropTypes.func.isRequired,
  rightAnswer: PropTypes.bool.isRequired,
};

export default ButtonNextQuestion;
