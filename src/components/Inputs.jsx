import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchToken } from '../redux/actions';

class Inputs extends Component {
  render() {
    const { handleOnChange, name, email, fetchApiToken } = this.props;
    let verify = true;
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
            onClick={ () => fetchApiToken() }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  fetchApiToken: () => dispatch(fetchToken()),
});

Inputs.propTypes = {
  handleOnChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  fetchApiToken: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Inputs);
