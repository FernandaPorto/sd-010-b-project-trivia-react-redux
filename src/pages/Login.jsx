import { connect } from 'react-redux';
import Typist from 'react-typist';
import { playerData, questionsData } from '../actions';
import Button from '../components/Button';
import Input from '../components/Input';
import './pages.css';

import Albert from '../img/albertEinstein.gif';

const React = require('react');
const PropTypes = require('prop-types');

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.checkInputs = this.checkInputs.bind(this);
    this.fetchToken = this.fetchToken.bind(this);
    this.fetchQuestion = this.fetchQuestion.bind(this);
    this.playGame = this.playGame.bind(this);

    this.state = {
      isButtonDisabled: true,
      name: '',
      gravatarEmail: '',
    };
  }

  handleChange({ target: { value, name } }) {
    this.setState({ [name]: value }, this.checkInputs);
  }

  checkInputs() {
    const emailCheck = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const { name, gravatarEmail } = this.state;

    const isValid = name.length > 0 && gravatarEmail.match(emailCheck);

    if (isValid) {
      this.setState({ isButtonDisabled: false });
    }
  }

  async fetchToken() {
    const request = await fetch('https://opentdb.com/api_token.php?command=request');
    const response = await request.json();

    return response.token;
  }

  async fetchQuestion(token) {
    // const request = await fetch(`https://opentdb.com/api.php?amount=5&encode=url3986&token=${token}`);
    const { params: { difficulty, type, category } } = this.props;
    const request = await fetch(` https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=${type}&encode=url3986&token=${token}`);

    const response = await request.json();

    return response.results;
  }

  async playGame() {
    const { history, sendPlayerData, sendQuestionsData } = this.props;
    const { name, gravatarEmail } = this.state;

    const token = await this.fetchToken();
    localStorage.setItem('token', token);
    const questions = await this.fetchQuestion(token);

    sendPlayerData({ name, gravatarEmail });
    sendQuestionsData(questions);

    history.push('/game');
  }

  render() {
    const { isButtonDisabled } = this.state;
    const { history } = this.props;
    return (
      <main>
        <form>
          <fieldset>
            <legend><Typist ms={ 10000 }>Einstein Trivia</Typist></legend>

            <Input
              test="input-player-name"
              onChange={ this.handleChange }
              id="name"
              type="text"
              placeholder="Nome"
              className="login-input"
            />
            <Input
              test="input-gravatar-email"
              onChange={ this.handleChange }
              id="gravatarEmail"
              type="email"
              placeholder="******"
              className="login-input"
            />
          </fieldset>
          <fieldset>
            <Button
              test="btn-play"
              disableButton={ isButtonDisabled }
              clickable={ this.playGame }
              value="Jogar"
            />
            <Button
              test="btn-settings"
              clickable={ () => history.push('/settings') }
              value="Configurações"
            />
          </fieldset>
          <section className="albert">
            <img src={ Albert } alt="Albert" />
          </section>
          <Typist ms={ 8000 }>
            <h1 className="Inicial">Gerenciamento de estado com Redux</h1>
          </Typist>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape().isRequired,
  sendPlayerData: PropTypes.func.isRequired,
  sendQuestionsData: PropTypes.func.isRequired,
  params: PropTypes.shape().isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  sendPlayerData: (state) => dispatch(playerData(state)),
  sendQuestionsData: (state) => dispatch(questionsData(state)),
});

const mapStateToProps = (state) => ({
  params: state.fetch.params,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
