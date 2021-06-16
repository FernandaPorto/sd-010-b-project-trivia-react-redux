import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStorage } from '../services/token';
import Cronometro from './Cronometro';

class Questions extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { ...props,
      next: false,
      isValid: false,
      value: false,
      isToggleOn: false };
    this.randAnswers = this.randAnswers.bind(this);
    this.listenerChange = this.listenerChange.bind(this);
    this.somaPontuacao = this.somaPontuacao.bind(this);
    this.teste = this.teste.bind(this);
  }

  randAnswers() {
    const { correct_answer: c, incorrect_answers: i } = this.state;
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
    this.score(result, timer, difficulty, answer);
  }

  score(result, timer, difficulty, answer) {
    const a = 10;
    const b = 3;
    const { player: { gravatarEmail, name, score: prev, assertions } } = getStorage();
    let assert = assertions;
    if (answer['data-testid'] === 'correct-answer') {
      if (difficulty === 'easy') {
        result = a + (timer * 1) + prev;
      }
      if (difficulty === 'medium') {
        result = a + (timer * 2) + prev;
      }
      if (difficulty === 'hard') {
        result = a + (timer * b) + prev;
      }
      assert += 1;
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
    this.setState({ value: true, next: true, difficulty, answer, isValid: true });
  }

  render() {
    const { correct_answer: c,
      category, question, value,
      isValid, difficulty, next, isToggleOn } = this.state;
    return (
      <div>
        <h3 data-testid="question-category">{category}</h3>
        <h3 data-testid="question-text">{question}</h3>
        {this.randAnswers().map((answer, idx) => {
          const checkColor = answer === c ? '3px solid rgb(6, 240, 15)'
            : '3px solid rgb(255, 0, 0)';
          const test = answer === c ? 'correct-answer' : `wrong-answer-${idx}`;
          const dataTestId = { 'data-testid': test };
          return (
            <button
              style={ { border: `${next ? checkColor : ''}` } }
              key={ answer }
              type="button"
              { ...dataTestId }
              disabled={ isValid }
              onClick={ () => this.somaPontuacao(dataTestId, difficulty) }
            >
              {answer}
            </button>
          );
        })}
        <Cronometro
          funcao={ this.listenerChange }
          funcaoStop={ this.teste }
          stop={ value }
        />
        { isToggleOn ? (
          <button
            type="button"
            data-testid="btn-next"
            // onClick={ }
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
