import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { setToken } from '../pages/GamePage';

class ButtonNextQuestion extends React.Component {
  render() {
    const { handleChange } = this.props;
    return (
      <Link to="/gamepage">
        <button type="button" onClick={ handleChange }>
          Próxima pergunta
        </button>
      </Link>
    );
  }
}

ButtonNextQuestion.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default ButtonNextQuestion;
