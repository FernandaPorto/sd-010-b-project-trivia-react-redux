import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { enviaDadosUsuario } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      nome: '',
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.verifyEmailAndName = this.verifyEmailAndName.bind(this);
    this.requisitarAPI = this.requisitarAPI.bind(this);
  }

  handleChange(event) {
    const { target: { id: key, value } } = event;
    this.setState({
      [key]: value,
    },
    this.verifyEmailAndName());
  }

  verifyEmailAndName() {
    const { email, nome } = this.state;
    if (email.length && nome.length) {
      this.setState({
        disabled: false,
      });
    }
  }

  async requisitarAPI() {
    const { actionEnviaDadosUsuario } = this.props;
    const { token } = await fetch('https://opentdb.com/api_token.php?command=request').then((resp) => resp.json());
    localStorage.setItem('token', token);
    actionEnviaDadosUsuario(this.state);
  }

  render() {
    const { email, nome, disabled } = this.state;
    return (
      <main>
        <form>
          <input
            data-testid="input-player-name"
            type="email"
            id="email"
            value={ email }
            onChange={ this.handleChange }
          />
          <input
            data-testid="input-gravatar-email"
            type="text"
            id="nome"
            value={ nome }
            onChange={ this.handleChange }
          />
          <Link to="/game">
            <button
              data-testid="btn-play"
              type="button"
              id="button"
              onClick={ () => this.requisitarAPI() }
              disabled={ disabled }
            >
              Jogar
            </button>
          </Link>
        </form>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  actionEnviaDadosUsuario: (state) => dispatch(enviaDadosUsuario(state)),
});

export default connect(null, mapDispatchToProps)(Login);
