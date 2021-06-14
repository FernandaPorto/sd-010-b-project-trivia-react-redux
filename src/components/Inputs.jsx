import React, { Component } from 'react';

class Inputs extends Component {
  render() {
    let verify = true;

    const { handleOnChange, name, email } = this.props;
    if (name.length > 0 && email.length) {
      verify = false;
    }

    return (
      <div>

        <form action="">
          <label htmlFor="name">
            Name
            <input
              name="name"
              type="text"
              id="name"
              data-testid="input-player-name"
              onChange={ handleOnChange }
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              name="email"
              type="text"
              id="email"
              data-testid="input-gravatar-email"
              onChange={ handleOnChange }
            />
          </label>
          <button
            data-testid="btn-play"
            type="button"
            disabled={ verify }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

export default Inputs;
