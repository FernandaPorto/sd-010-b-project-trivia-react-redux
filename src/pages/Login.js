import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchToken } from '../actions/userAction';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      playerName: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { value, id } }) {
    this.setState({
      [id]: value,
    });
  }

  render() {
    const { email, playerName } = this.state;
    const { requestToken } = this.props;
    const emailValid = email.length <= 0 || playerName.length <= 0;
    return (
      <>
        <label htmlFor="email">
          Email do Gravatar
          <input
            data-testid="input-gravatar-email"
            id="email"
            type="email"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="playerName">
          Nome do Jogador
          <input
            data-testid="input-player-name"
            id="playerName"
            type="text"
            onChange={ this.handleChange }
          />
          <Link to="/game">
            <button
              data-testid="btn-play"
              type="submit"
              disabled={ emailValid }
              onClick={ requestToken }
            >
              Jogar
            </button>
          </Link>
        </label>
      </>
    );
  }
}

const mapStateToProps = () => ({

});

const mapDispatchToProps = (dispatch) => ({
  requestToken: () => dispatch(fetchToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
