import React from 'react';
import { Link } from 'react-router-dom';

class ButtonFeedback extends React.Component {
  render() {
    return (
      <Link to="/feedback">
        <button type="button">
          Página de FeedBacks
        </button>
      </Link>
    );
  }
}

export default ButtonFeedback;
