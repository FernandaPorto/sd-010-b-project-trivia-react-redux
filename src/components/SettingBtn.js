import React from 'react';
import { Link } from 'react-router-dom';

export default class SettingBtn extends React.Component {
  render() {
    return (
      <Link to="/setting">
        <button
          type="button"
          data-testid="btn-settings"
        >
          Configuração
        </button>
      </Link>
    );
  }
}
