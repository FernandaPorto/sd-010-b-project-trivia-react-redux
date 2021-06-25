import React from 'react';
import { Link } from 'react-router-dom';

import settingsSVG from '../svg/settings.svg';

class Button extends React.Component {
  render() {
    return (
      <button type="button" className="button-svg">
        <Link to="/settings">
          <img className="svg-icon" src={ settingsSVG } title="Settings" alt="Settings" />
        </Link>
      </button>
    );
  }
}

export default Button;
