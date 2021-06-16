import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Feedback extends Component {
  render() {
    return (
      // <HeaderFeedback /> aqui sera importado o header de feedback
      <div>
        <button type="button">
          <Link to="/">Jogar novamente</Link>
        </button>
      </div>
    );
  }
}

export default Feedback;
