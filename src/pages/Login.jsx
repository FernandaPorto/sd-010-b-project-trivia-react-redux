import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import md5 from 'crypto-js/md5';

import { loginActionCreator } from '../redux/actions';
import SettingsButton from '../components/SettingsButton';
import fetchToken from '../services/api';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      name: '',
      email: '',
      redirect: false,
    };
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  async handleClick() {
    const { name, email } = this.state;
    const { login } = this.props;
    const URL = 'https://opentdb.com/api_token.php?command=request';

    const hash = md5(email).toString();
    const gravatarURL = `https://www.gravatar.com/avatar/${hash}`;
    login({ name, email, gravatarURL });

    const { token } = await fetchToken(URL);
    localStorage.setItem('token', token);

    this.setState({ redirect: true });
  }

  render() {
    const { name, email, redirect } = this.state;
    if (redirect) return <Redirect to="/Game" />;
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
