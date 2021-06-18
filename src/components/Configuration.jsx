import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Configuration extends Component {
  render() {
    const { config } = this.props;
    return (
      <div>
        <h1 data-testid="settings-title">
          Configuração do jogo
        </h1>

        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => config() }
        >
          Ok
        </button>
      </div>
    );
  }
}

Configuration.propTypes = {
  config: PropTypes.func,
}.isRequired;

export default Configuration;