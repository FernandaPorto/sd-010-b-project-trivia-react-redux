import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { setToken } from '../pages/GamePage';

class ButtonNextQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.functionsGamePage = this.functionsGamePage.bind(this);
  }

  functionsGamePage() {
    const { handleChange, nextQuestion, interval } = this.props;
    handleChange();
    nextQuestion();
    interval();
  }

  render() {
    const { answered } = this.props;
    return (
      <Link to="/gamepage">
        <button
          type="button"
          data-testid="btn-next"
          disabled={ answered }
          onClick={ this.functionsGamePage }
        >
          Próxima
        </button>
      </Link>
    );
  }
}

ButtonNextQuestion.propTypes = {
  handleChange: PropTypes.func.isRequired,
  answered: PropTypes.bool.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  interval: PropTypes.func.isRequired,
};

export default ButtonNextQuestion;
