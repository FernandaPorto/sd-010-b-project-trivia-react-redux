import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loginActionCreator } from '../redux/actions';
import SettingsButton from '../components/SettingsButton';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      name: '',
      email: '',
    };
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { login } = this.props;

    login(this.state);
  }

  render() {
    const { name, email } = this.state;
    return (
      <section>
        <div>
          <input
            type="text"
            data-testid="input-player-name"
            name="name"
            placeholder=""
            onChange={ this.handleChange }
          />
          <input
            type="email"
            data-testid="input-gravatar-email"
            name="email"
            placeholder=""
            onChange={ this.handleChange }
          />
          <input
            type="button"
            value="Jogar"
            disabled={ !(name && email) }
            data-testid="btn-play"
            onClick={ this.handleClick }
          />
        </div>
        <div>
          <SettingsButton />
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(loginActionCreator(payload)),
});

Login.propTypes = {
  login: PropTypes.func,
}.isRequired;

export default connect(undefined, mapDispatchToProps)(Login);
