import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getGravatarAction, fetchQuestionsAction } from '../actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '', // 'Vinicius Alves da Rocha',
      email: '', // 'vinialvesrocha@gmail.com',
    };
    this.handle = this.handle.bind(this);
  }

  getToken() {
    const { getGravatar } = this.props;
    fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((responseToken) => {
        if (!localStorage.getItem('token')) {
          localStorage.setItem('token', JSON.stringify(responseToken.token));
          console.log(localStorage.getItem('token'));
        }
      });
    const { email } = this.state;
    getGravatar(email);
  }

  handle(event) {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value,
    });
  }

  submit(name, email) {
    const { getGravatar, fetchQuestions } = this.props;
    getGravatar(name, email);
    fetchQuestions();
  }

  render() {
    const { name, email } = this.state;
    return (
      <>
        <form>
          <label htmlFor="name">
            Nome:
            <input
              data-testid="input-player-name"
              id="name"
              type="text"
              name="name"
              value={ name }
              onChange={ this.handle }
            />
          </label>

          <label htmlFor="email">
            E-mail:
            <input
              data-testid="input-gravatar-email"
              id="email"
              type="email"
              name="email"
              value={ email }
              onChange={ this.handle }
            />
          </label>
        </form>
        <Link onClick={ () => this.submit(name, email) } to="/game">
          <button
            data-testid="btn-play"
            type="submit"
            disabled={ (!name || !email) ? true : false }
          >
            Login
          </button>
        </Link>

        <Link to="/settings">
          <button data-testid="btn-settings" type="button">Settings</button>
        </Link>
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  getGravatar: (name, email) => {
    console.log(email);
    return dispatch(getGravatarAction(name, email));
  },
  fetchQuestions: () => dispatch(fetchQuestionsAction()),
});
export default connect(null, mapDispatchToProps)(Login);
