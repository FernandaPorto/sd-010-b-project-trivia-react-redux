import React from 'react';
import { Redirect } from 'react-router';
import FetchApi from '../services/fetchApi';
import '../App.css';

class Questions extends React.Component {
  constructor() {
    super();

    this.state = {
      perguntas: [],
      allAnswers: [],
      rightAnswer: [],
      assertions: 0,
      indice: 0,
      disable: false,
      nextDisable: true,
      timer: 30,
      score: 0,
      isRedirect: false,
    };
    this.updtadeQuestions = this.updtadeQuestions.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.timer = this.timer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.clearStyles = this.clearStyles.bind(this);
    this.identifyQuestionsType = this.identifyQuestionsType.bind(this);
    this.renderNextQuestionButton = this.renderNextQuestionButton.bind(this);
    this.freezedByTimer = this.freezedByTimer.bind(this);
    this.calcDificult = this.calcDificult.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
    this.booleanQuestions = this.booleanQuestions.bind(this);
  }

  componentDidMount() {
    FetchApi().then((data) => this.updtadeQuestions(data));
    this.timer();
  }

  nextQuestion() {
    const { indice, perguntas, rightAnswer } = this.state;
    const FIVE = 5;
    if (indice + 1 === FIVE) return this.setState({ isRedirect: true });
    this.setState((prev) => ({ indice: prev.indice + 1 }));
    this.setState(() => ({ timer: 30 }));
    this.setState({ disable: false });
    this.setState({ nextDisable: true });
    this.clearStyles();
    console.log(indice);

    // const { incorrect_answers } = perguntas.results[indice];
    // // console.log(help);
    const incorrect = perguntas[indice + 1].incorrect_answers;
    const correct = perguntas[indice + 1].correct_answer;

    console.log(correct);
    const allAnswers = incorrect.concat(correct);
    console.log(allAnswers);
    // this.setState({ allAnswers: [] });
    this.setState({ allAnswers });
  }

  clearStyles() {
    const buttons = document.querySelectorAll('.default');
    buttons.forEach((button) => {
      button.classList.remove('green-border');
      button.classList.remove('red-border');
    });
  }

  updtadeQuestions(perguntas) {
    const dados = JSON.parse(localStorage.getItem('state'));
    // console.log(perguntas.results);
    const { indice } = this.state;
    const { incorrect_answers } = perguntas.results[indice];
    // console.log(help);
    const { correct_answer } = perguntas.results[indice];
    console.log(correct_answer);
    const allAnswers = incorrect_answers.concat(correct_answer);
    console.log(allAnswers);
    this.setState({ perguntas: perguntas.results, rightAnswer: correct_answer, allAnswers, score: dados.player.score });
  }

  calcDificult(dificculty) {
    let dificuldade;
    const hard = 3;
    const medium = 2;
    const easy = 1;
    if (dificculty === 'hard') {
      dificuldade = hard;
    } else if (dificculty === 'medium') {
      dificuldade = medium;
    } else {
      dificuldade = easy;
    }
    return dificuldade;
  }

  updateLocalStorage() {
    const { score, assertions } = this.state;
    const dados = JSON.parse(localStorage.getItem('state'));

    const player = { player: {
      name: dados.player.name,
      assertions,
      score,
      gravatarEmail: dados.player.gravatarEmail,
    } };

    localStorage.setItem('state', JSON.stringify(player));
  }

  checkAnswer(props) {
    const { timer, indice, perguntas, rightAnswer } = this.state;
    const dificculty = perguntas[indice].difficulty;
    const dificuldade = this.calcDificult(dificculty);
    const MNumber = 10;

    const buttons = document.querySelectorAll('.default');
    this.setState({
      disable: true,
      nextDisable: false,
    });

    buttons.forEach((button) => {
      // console.log(button.name);
      if (button.name === 'correct-answer') {
        return button.classList.add('green-border');
      }
      return button.classList.add('red-border');
    });

    if (props.value === rightAnswer) {
      const calculo = MNumber + (timer * dificuldade);
      this.setState((prev) => ({
        score: prev.score + calculo,
        assertions: prev.assertions + 1 }), () => this.updateLocalStorage());
    }
  }

  regress() {
    const { timer } = this.state;
    if (timer === 0) this.freezedByTimer();
    if (timer > 0) return this.setState((prev) => ({ timer: prev.timer - 1 }));
  }

  timer() {
    const MS = 1000;
    setInterval(() => { this.regress(); }, MS);
  }

  freezedByTimer() {
    return this.setState({ disable: true });
  }

  booleanQuestions() {
    const { rightAnswer, disable, indice, perguntas } = this.state;

    return (
      <div>
        <p data-testid="question-category">{`Categoria ${perguntas[indice].category}`}</p>
        <p data-testid="question-text">{`Pergunta: ${perguntas[indice].question}`}</p>

        <button
          type="button"
          data-testid="correct-answer"
          name="correct-answer"
          disabled={ disable }
          className="default"
          onClick={ this.checkAnswer }
        >
          {`Resposta1: ${perguntas[indice].correct_answer}`}
        </button>
        <button
          type="button"
          data-testid="wrong-answer"
          name="wrong-answer"
          disabled={ disable }
          className="default"
          onClick={ this.checkAnswer }
        >
          {`Resposta2: ${perguntas[indice].incorrect_answers[0]}`}
        </button>
      </div>);
  }

  identifyQuestionsType(perguntas) {
    const { indice } = this.state;
    if (perguntas[indice].type === 'multiple') { return this.renderQuestions(perguntas); }
    return this.booleanQuestions();
  }

  verifyAnswer(param) {
    const { rightAnswer, disable, indice } = this.state;
    console.log(param);
    if (param === rightAnswer) {
      return (
        <div>

          <button
            type="button"
            data-testid="correct-answer"
            name="correct-answer"
            disabled={ disable }
            className="default"
            onClick={ this.checkAnswer }
          >
            {`Resposta${indice + 1}: ${param}`}
          </button>
        </div>
      );
    }
    return (
      <button
        type="button"
        data-testid={ `wrong-answer-${indice}` }
        name="wrong-answer"
        disabled={ disable }
        className="default"
        onClick={ this.checkAnswer }
      >
        {`Resposta${indice + 1}: ${param}`}

      </button>
    );
  }

  renderQuestions(perguntas) {
    const { indice, allAnswers } = this.state;

    return (
      <div>
        <p data-testid="question-category">{`Categoria ${perguntas[indice].category}`}</p>
        <p data-testid="question-text">{`Pergunta: ${perguntas[indice].question}`}</p>
        {/* {allAnswers.map(((answer, index) => (
          <section key={ index }> */}
        {/* {this.verifyAnswer(allAnswers)} */}
        {/* </section> */}
      </div>
    );
  }

  renderNextQuestionButton() {
    const { nextDisable } = this.state;
    if (nextDisable === false) {
      return (
        <button
          type="button"
          disabled={ nextDisable }
          data-testid="btn-next"
          onClick={ this.nextQuestion }
        >
          Próxima pergunta
        </button>
      );
    }
  }

  render() {
    const { perguntas, isRedirect } = this.state;
    if (perguntas.length < 1) return <p>Carregando...</p>;
    return (
      <div>
        { isRedirect && <Redirect to="/feedback" />}
        {this.identifyQuestionsType(perguntas)}
        { this.renderNextQuestionButton() }
        {/* {console.log(Math.floor(Math.random() * 5))} */}
      </div>
    );
  }
}

export default Questions;
