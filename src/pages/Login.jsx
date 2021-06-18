import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { enviaDadosUsuario, getApiResultAction } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.verifyEmailAndName = this.verifyEmailAndName.bind(this);
    this.requisitarToken = this.requisitarToken.bind(this);
    this.getGravatar = this.getGravatar.bind(this);
    this.requisitarAPI = this.requisitarAPI.bind(this);
  }

  async getGravatar() {
    const { email } = this.state;
    const emailFormatado = md5(email).toString();
    const gravatar = await fetch(`https://www.gravatar.com/avatar/${emailFormatado}`).then((objeto) => objeto.url);
    return gravatar;
  }

  async requisitarAPI(token) {
    const { requestApi, settings } = this.props;
    let { category, difficulty, type } = settings;
    if (category !== '') {
      category = `&category=${category}`;
    }
    if (difficulty !== '') {
      difficulty = `&difficulty=${difficulty}`;
    }
    if (type !== '') {
      type = `&type=${type}`;
    }
    const apiResults = await fetch(`https://opentdb.com/api.php?amount=5${category}${difficulty}${type}&token=${token}`)
      .then((resp) => resp.json());
    requestApi(apiResults);
  }

  async requisitarToken() {
    const { name } = this.state;
    const { actionEnviaDadosUsuario } = this.props;
    const { token } = await fetch('https://opentdb.com/api_token.php?command=request').then((resp) => resp.json());
    localStorage.setItem('token', token);
    this.requisitarAPI(token);
    const gravatar = await this.getGravatar();
    actionEnviaDadosUsuario({
      name,
      email: gravatar,
    });
  }

  handleChange(event) {
    const { target: { id: key, value } } = event;
    this.setState({
      [key]: value,
    },
    () => this.verifyEmailAndName());
  }

  verifyEmailAndName() {
    const { email, name } = this.state;
    if (email.length && name.length) {
      this.setState({
        disabled: false,
      });
    }
  }

  render() {
    const { email, name, disabled } = this.state;
    return (
      <main>
        <form>
          <input
            data-testid="input-gravatar-email"
            type="email"
            id="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
          <input
            data-testid="input-player-name"
            type="text"
            id="name"
            name="name"
            value={ name }
            onChange={ this.handleChange }
          />
          <Link to="/game">
            <button
              data-testid="btn-play"
              type="button"
              id="button"
              onClick={ () => this.requisitarToken() }
              disabled={ disabled }
            >
              Jogar
            </button>
          </Link>
          <Link to="/settings">
            <button type="button" data-testid="btn-settings">
              Configurações
            </button>
          </Link>
        </form>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  actionEnviaDadosUsuario: (state) => dispatch(enviaDadosUsuario(state)),
  requestApi: (resultApi) => dispatch(getApiResultAction(resultApi)),
});

const mapStateToProps = (state) => ({
  settings: state.game.settings,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

Login.propTypes = {
  actionEnviaDadosUsuario: PropTypes.func.isRequired,
  requestApi: PropTypes.func.isRequired,
  settings: PropTypes.shape(
    { category: PropTypes.string,
      difficulty: PropTypes.string,
      type: PropTypes.string },
  ).isRequired,
};
