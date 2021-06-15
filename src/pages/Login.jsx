import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loginAction } from '../actions';
import fetchURL from '../services/API';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAdress: '',
      name: '',
      buttonEnabler: true,
      shouldRedirect: false,
    };

    this.validationFields = this.validationFields.bind(this);
    this.onClick = this.onClick.bind(this);
    this.setToken = this.setToken.bind(this);
    this.settingsButton = this.settingsButton.bind(this);
    this.setToken = this.setToken.bind(this);
  }

  // componentDidMount() {
  //   const { name, emailAdress } = this.state;
  //   const { userPlay } = this.props;
  //   console.log(name, emailAdress);
  //   userPlay(name, emailAdress);
  // }

  onClick() {
    const { name, emailAdress } = this.state;
    const { userPlay } = this.props;
    console.log(name, emailAdress);
    userPlay(name, emailAdress);
    // const { emailAdress, name } = this.state;
    // const { firstDispatch } = this.props;
    // firstDispatch(emailAdress, passwordData);
    this.setState({ shouldRedirect: true });
    this.setToken();
  }

  async setToken() {
    const token = await fetchURL();
    console.log(token);
    localStorage.setItem('token', JSON.stringify(token));
    try {
      const FetchTrivia = fetch(`https://opentdb.com/api.php?amount=5&token=${token}`).then((response) => response.JSON());
      console.log(FetchTrivia);
    } catch (error) {
      console.log(error);
    }
  }

  settingsButton() {
    return (
      <Link to="/settings">
        <button type="button" data-testid="btn-settings">
          Configurações
        </button>
      </Link>
    );
  }

  validationFields() {
    const { emailAdress, name } = this.state;
    const number = 3;
    const emailChecker = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g;
    if (emailAdress.match(emailChecker) && name.length > number) {
      this.setState({ buttonEnabler: false });
    } else { this.setState({ buttonEnabler: true }); }
  }

  render() {
    const { name, emailAdress, buttonEnabler, shouldRedirect } = this.state;
    const { emailPlay } = this.props;
    if (shouldRedirect) {
      return <Redirect to="/gamepage" />;
    }
    return (
      <div>
        <label htmlFor="name">
          <input
            id="name"
            type="text"
            data-testid="input-player-name"
            placeholder="insert your name"
            value={ name }
            onInput={ emailPlay }
            onChange={ ({ target: { value } }) => {
              this.setState({ name: value });
              this.validationFields();
            } }
            required
          />
        </label>
        <div />
        <label htmlFor="email">
          <input
            id="email"
            data-testid="input-gravatar-email"
            type="email"
            placeholder="insert your email"
            value={ emailAdress }
            onChange={ ({ target: { value } }) => {
              this.setState({ emailAdress: value });
              this.validationFields();
            } }
            required
          />
        </label>
        <button
          type="button"
          disabled={ buttonEnabler }
          data-testid="btn-play"
          onClick={ () => this.onClick() }
        >
          Jogar
        </button>
        { this.settingsButton() }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userPlay: (name, email) => dispatch(loginAction({ name, email })),
});

LoginPage.propTypes = ({
  userPlay: PropTypes.func.isRequired,
  emailPlay: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
});

export default connect(null, mapDispatchToProps)(LoginPage);
