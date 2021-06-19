import React from 'react';
import { Link } from 'react-router-dom';

import settingsSVG from '../svg/settings.svg';

class Button extends React.Component {
  render() {
    return (
      <button type="button" className="button-alt">
        <Link to="/settings">
          <img className="svg-icon" src={ settingsSVG } alt="Settings" />
        </Link>
      </button>
    );
  }
}

export default Button;
