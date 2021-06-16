import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { getStorage } from '../services/token';
import Cronometro from './Cronometro';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = { array: props,
      next: false,
      index: 0,
      isValid: false,
      value: false,
      restart: true,
      isToggleOn: false };
    this.randAnswers = this.randAnswers.bind(this);
    this.listenerChange = this.listenerChange.bind(this);
    this.somaPontuacao = this.somaPontuacao.bind(this);
    this.teste = this.teste.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  randAnswers(c, i) {
    // const { correct_answer: c, incorrect_answers: i } = this.state;
    const inc = [...i];
    const rand = Math.floor(Math.random() * ((inc.length - 1) + 1));
    const swap = inc[rand];
    inc.splice(rand, 0);
    inc[rand] = c;
    return [...inc, swap];
  }

  listenerChange() {
    this.setState({ isValid: true, isToggleOn: true });
  }

  teste(state) {
    this.setState({ value: false });
    const { difficulty, answer } = this.state;
    const timer = state;
    const result = 0;
    console.log(difficulty);
    this.score(result, timer, difficulty, answer);
  }

  nextQuestion() {
    const { index } = this.state;
    const prev = index;
    this.setState({ index: prev + 1,
      next: false,
      isValid: false,
      isToggleOn: false,
      restart: true });
  }

  score(result, timer, difficulty, answer) {
    const a = 10;
    const b = 3;
    const { player: { gravatarEmail, name, score: prev, assertions } } = getStorage();
    let assert = assertions;
    if (answer['data-testid'] === 'correct-answer') {
      if (difficulty === 'easy') {
        result = a + (timer * 1) + prev;
      } else if (difficulty === 'medium') {
        result = a + (timer * 2) + prev;
      } else if (difficulty === 'hard') {
        result = a + (timer * b) + prev;
      }
      assert += 1;
    } else {
      result = prev;
    }
    const { funcao } = this.props;
    funcao(result);
    localStorage.setItem('state', JSON.stringify({
      player: {
        name,
        assertions: assert,
        score: result,
        gravatarEmail },
    }));
  }

  somaPontuacao(answer, difficulty) {
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn,
    }));
    this.setState({ value: true,
      next: true,
      restart: false,
      difficulty,
      answer,
      isValid: true });
  }

  render() {
    const { array, index, value, restart, isValid, next, isToggleOn } = this.state;
    const limit = 5;
    if (index === limit) return <Redirect to="/feedback" />;
    return (
      <div>
        <h3 data-testid="question-category">{array[index].category}</h3>
        <h3 data-testid="question-text">{array[index].question}</h3>
        {this.randAnswers(array[index].correct_answer,
          array[index].incorrect_answers).map((answer, idx) => {
          const checkColor = answer === array[index].correct_answer
            ? '3px solid rgb(6, 240, 15)'
            : '3px solid rgb(255, 0, 0)';
          const test = answer === array[index].correct_answer
            ? 'correct-answer' : `wrong-answer-${idx}`;
          const dataTestId = { 'data-testid': test };
          return (
            <button
              style={ { border: `${next ? checkColor : ''}` } }
              key={ answer }
              type="button"
              { ...dataTestId }
              disabled={ isValid }
              onClick={ () => this.somaPontuacao(dataTestId, array[index].difficulty) }
            >
              {answer}
            </button>
          );
        })}
        <Cronometro
          funcao={ this.listenerChange }
          funcaoStop={ this.teste }
          restart={ restart }
          stop={ value }
        />
        { isToggleOn ? (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.nextQuestion }
          >
            Próxima
          </button>) : null }
      </div>
    );
  }
}

Questions.propTypes = {
  funcao: PropTypes.func.isRequired,
};

export default Questions;
