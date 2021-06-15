import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { sendGravatarToRedux } from '../actions/index';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      indexQuestion: 0,
      right: '',
      wrong: '',
    };
    this.saveQuestionsInState = this.saveQuestionsInState.bind(this);
    this.renderQuestion = this.renderQuestion.bind(this);
    this.trueOrFalseAnswers = this.renderQuestion.bind(this);
  }

  componentDidMount() {
    const { saveGravatar, email, token } = this.props;

    const hashEmail = md5(email).toString();
    const URL = `https://www.gravatar.com/avatar/${hashEmail}`;
    fetch(URL)
      .then(({ url }) => saveGravatar(url));

    const urlTrivia = `https://opentdb.com/api.php?amount=5&token=${token}`;
    fetch(urlTrivia)
      .then((data) => data.json())
      .then((questions) => this.saveQuestionsInState(questions));
  }

  saveQuestionsInState({ results }) {
    this.setState({
      results,
    });
  }

  nextIndex() {
    this.setState({
      right: 'initial',
      wrong: 'initial',
    });
    const { indexQuestion, results } = this.state;
    if (indexQuestion === results.length - 1) {
      return false;
    }

    this.setState((oldState) => ({
      indexQuestion: oldState.indexQuestion + 1,
    }));
  }

  changeStyle() {
    this.setState({
      right: '3px solid rgb(6, 240, 15)',
      wrong: '3px solid rgb(255, 0, 0)',
    });
  }

  multipleAnswers({
    correct_answer: correctAnswer,
    incorrect_answers: incorrectAnswers,
  }) {
    const { wrong, right } = this.state;
    const rightAnswer = (
      <button
        type="button"
        data-testid="correct-answer"
        key="4"
        style={ {
          border: right,
        } }
        onClick={ () => this.changeStyle() }
      >
        { correctAnswer }
      </button>
    );
    const wrongAnswers = (
      incorrectAnswers.map((answer, index) => (
        <button
          type="button"
          data-testid={ `wrong-answer-${index}` }
          key={ index }
          style={ {
            border: wrong,
          } }
          onClick={ () => this.changeStyle() }
        >
          { answer }
        </button>
      ))
    );
    const MAX_INDEX = 3;
    const randomIndex = Math.floor(Math.random() * (MAX_INDEX - 0 + 1)) + 0;
    wrongAnswers.splice(randomIndex, 0, rightAnswer);
    const answers = wrongAnswers;
    return (
      <div>
        { answers }
      </div>
    );
  }

  trueButtonIsCorrect() {
    const { right, wrong } = this.state;
    let buttonTrue = '';
    let buttonFalse = '';
    buttonTrue = (
      <button
        type="button"
        data-testid="correct-answer"
        style={ {
          border: right,
        } }
        onClick={ () => this.changeStyle() }
      >
        True
      </button>
    );
    buttonFalse = (
      <button
        type="button"
        data-testid="wrong-answer"
        style={ {
          border: wrong,
        } }
        onClick={ () => this.changeStyle() }
      >
        False
      </button>
    );
    return ([buttonTrue, buttonFalse]);
  }

  falseButtonIsRight() {
    const { right, wrong } = this.state;
    let buttonTrue = '';
    let buttonFalse = '';
    buttonTrue = (
      <button
        type="button"
        data-testid="wrong-answer"
        style={ {
          border: wrong,
        } }
        onClick={ () => this.changeStyle() }
      >
        True
      </button>
    );
    buttonFalse = (
      <button
        type="button"
        data-testid="correct-answer"
        style={ {
          border: right,
        } }
        onClick={ () => this.changeStyle() }
      >
        False
      </button>
    );
    return ([buttonTrue, buttonFalse]);
  }

  trueOrFalseAnswers({
    correct_answer: correctAnswer,
  }) {
    return (
      <div>
        {correctAnswer === 'True'
          ? this.trueButtonIsCorrect() : this.falseButtonIsRight() }
      </div>
    );
  }

  renderQuestion() {
    const { results, indexQuestion } = this.state;
    const question = results[indexQuestion];
    if (question !== undefined) {
      return (
        <div>
          <h3 data-testid="question-category">{ question.category }</h3>
          <h4 data-testid="question-text">{ question.question }</h4>
          { question.type === 'multiple'
            ? this.multipleAnswers(question) : this.trueOrFalseAnswers(question) }
        </div>
      );
    }
  }

  render() {
    const { nome, gravatar } = this.props;
    const { results } = this.state;
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ gravatar }
            alt={ nome }
          />
          <p data-testid="header-player-name">{nome}</p>
          <p data-testid="header-score">0</p>
        </header>
        <main>
          { results !== [] && this.renderQuestion() }
        </main>
        <button type="button" onClick={ () => this.nextIndex() }>Próxima pergunta</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveGravatar: (gravatar) => dispatch(sendGravatarToRedux(gravatar)),
});

const mapStateToProps = (state) => ({
  email: state.playerReducer.email,
  nome: state.playerReducer.nome,
  gravatar: state.playerReducer.gravatar,
  token: state.tokenState.token,
});

Game.propTypes = {
  saveGravatar: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
  gravatar: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
