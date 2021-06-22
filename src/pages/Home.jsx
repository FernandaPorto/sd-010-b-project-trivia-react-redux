import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import fetchImageGravatar from '../services/fetchImageGravatar';
import { updateGravatarEmail, updateName, updateUrlGravatar } from '../actions/player';
import { setBtnReady } from '../actions/controls';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.inputsFilledCorrectly = this.inputsFilledCorrectly.bind(this);
    this.setGravatarEmail = this.setGravatarEmail.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async setGravatarEmail() {
    const { state: { player: { gravatarEmail } }, urlGravatarUpdate } = this.props;
    await fetchImageGravatar(gravatarEmail)
      .then((data) => urlGravatarUpdate(data));
  }

  handleClick() {
    const { state: { player }, readyBtnUpdate } = this.props;

    readyBtnUpdate(false);
    localStorage.setItem('state', JSON.stringify({ player }));
  }

  inputsFilledCorrectly() {
    const { userName, email } = this.state;
    const { readyBtnUpdate, gravatarEmailUpdate, nameUpdate } = this.props;
    if (userName.length > 0 && email.match(/^\S+@\S+\.\S+$/i)) {
      gravatarEmailUpdate(email);
      nameUpdate(userName);
      this.setGravatarEmail();
      return readyBtnUpdate(true);
    }
    readyBtnUpdate(false);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => this.inputsFilledCorrectly());
  }

  render() {
    const { state: { controls: { buttonReady } } } = this.props;
    return (
      <>
        <p> Bem vindo </p>
        <p> Trybe Quiz </p>

        <input
          type="text"
          name="userName"
          onChange={ this.handleChange }
          placeholder="Digite seu nome"
          data-testid="input-player-name"
        />
        <input
          type="email"
          name="email"
          onChange={ this.handleChange }
          placeholder="email@example.com"
          data-testid="input-gravatar-email"
        />
        <Link to="/game">
          <button
            type="button"
            disabled={ !buttonReady }
            onClick={ this.handleClick }
            data-testid="btn-play"
          >
            Jogar
          </button>
        </Link>
        <Link to="/settings">
          <button type="button" data-testid="btn-settings">Configurações</button>
        </Link>

      </>
    );
  }
}

Home.propTypes = {
  state: PropTypes.objectOf(
    PropTypes.any,
  ).isRequired,
  nameUpdate: PropTypes.func.isRequired,
  gravatarEmailUpdate: PropTypes.func.isRequired,
  readyBtnUpdate: PropTypes.func.isRequired,
  urlGravatarUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ state });

const mapDispatchToProps = (dispatch) => ({
  nameUpdate: (name) => dispatch(updateName(name)),
  gravatarEmailUpdate: (email) => dispatch(updateGravatarEmail(email)),
  readyBtnUpdate: (value) => dispatch(setBtnReady(value)),
  urlGravatarUpdate: (urlGravatar) => dispatch(updateUrlGravatar(urlGravatar)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
