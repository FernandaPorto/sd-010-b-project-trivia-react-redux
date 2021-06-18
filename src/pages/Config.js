import React from 'react';
import { Link } from 'react-router-dom';

class Config extends React.Component {
  render() {
    return (
      <section className="body-section">
        <section className="config-section">
          <h1 data-testid="settings-title">
            <span role="img" aria-label="cog">&#9881;&#65039;</span>
            Configurações
          </h1>
          <form className="config-form">
            <label htmlFor="category">
              CATEGORIA
              {/* <select id="category" name="category">
                <option name="random">Aleatório</option>
              </select> */}
            </label>
            <label htmlFor="difficulty">
              DIFICULDADE
              {/* <select id="difficulty" name="difficulty">
                <option name="random">Aleatório</option>
                <option name="easy">Fácil</option>
                <option name="medium">Mádio</option>
                <option name="hard">Difícil</option>
              </select> */}
            </label>
            <label htmlFor="type">
              TIPO
              {/* <select id="type" name="type">
                <option name="random">Aleatório</option>
                <option name="multiple">Multipla Escolha</option>
                <option name="boolean">Verdadeiro ou Falso</option>
              </select> */}
            </label>
            <Link to="/">
              <button
                data-testid="btn-go-home"
                type="button"
                className="config-section-btn"
              >
                &#9658;
              </button>
            </Link>
          </form>
        </section>
      </section>
    );
  }
}

export default Config;
