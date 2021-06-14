import React, { Component } from 'react';

export default class Form extends Component {
  render() {
    return (
      <form>
        <label htmlFor="name">
          Nome
          <input type="type" id="name" data-testid="input-player-name" />
        </label>
        <label htmlFor="email">
          Email
          <input type="email" id="email" data-testid="input-gravatar-email" />
        </label>
        <button type="submit" data-testid="btn-play">
          Jogar
        </button>
      </form>
    );
  }
}
