import React from 'react';

class Config extends React.Component {
  render() {
    return (
      <section className="body-section">
        <section className="config-section">
          <h1 data-testid="settings-title">
            <span role="img" aria-label="cog">&#9881;&#65039;</span>
            Configurações
          </h1>
        </section>
      </section>
    );
  }
}

export default Config;
