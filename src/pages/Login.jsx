import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
// import { setToken } from './GamePage';
import ButtonSettings from '../components/ButtonSettings';
import { loginAction, fetchAction } from '../actions';
import logo from '../trivia.png';

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
    // this.setToken = this.setToken.bind(this);
    // this.settingsButton = this.settingsButton.bind(this);
  }
  // componentDidMount() {
  //   const { name, emailAdress } = this.state;
  //   const { userPlay } = this.props;
  //   console.log(name, emailAdress);
  //   userPlay(name, emailAdress);
  // }

  async onClick() {
    const { name, emailAdress } = this.state;
    const { userPlay } = this.props;
    userPlay(name, emailAdress);
    // const { emailAdress, name } = this.state;
    // const { firstDispatch } = this.props;
    // firstDispatch(emailAdress, passwordData);
    this.setState({ shouldRedirect: true });
    localStorage.setItem('name', JSON.stringify(name));
    const { sendFetchToStore } = this.props;
    sendFetchToStore();
  }

  // async getToken() {
  //   const { sendFetchToStore } = this.props;
  //   const resultFetchTrivia = await setToken();
  //   const map = resultFetchTrivia.results
  //     .map((result) => result);
  //   sendFetchToStore(map);
  // }

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
        <main>
          <img src={ logo } alt="logo" />
          <label htmlFor="name">
            <input
              id="name"
              type="text"
              data-testid="input-player-name"
              placeholder="insert your name"
              value={ name }
              onInput={ emailPlay }
              onChange={ ({ target: { value } }) => {
                this.setState({ name: value }, () => this.validationFields());
              } }
              required
            />
          </label>
          <label htmlFor="email">
            <input
              id="email"
              data-testid="input-gravatar-email"
              type="email"
              placeholder="insert your email"
              value={ emailAdress }
              onChange={ ({ target: { value } }) => {
                this.setState({ emailAdress: value }, () => this.validationFields());
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
          <ButtonSettings />
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userPlay: (name, email) => dispatch(loginAction({ name, email })),
  sendFetchToStore: (fetch) => dispatch(fetchAction({ fetch })),
});

LoginPage.propTypes = ({
  userPlay: PropTypes.func.isRequired,
  sendFetchToStore: PropTypes.func.isRequired,
  emailPlay: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
});

export default connect(null, mapDispatchToProps)(LoginPage);
