import React from 'react';
import { Link } from 'react-router-dom';

class Button extends React.Component {
  render() {
    return (
      <button
        type="button"
        data-testid="btn-settings"
      >
        <Link to="/settings">Settings</Link>
      </button>
    );
  }
}

export default Button;
