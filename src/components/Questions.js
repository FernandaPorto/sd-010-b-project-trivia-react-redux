import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { Card, Button, Container } from 'react-bootstrap';
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
      int: true,
      isToggleOn: false };
    this.randAnswers = this.randAnswers.bind(this);
    this.listenerChange = this.listenerChange.bind(this);
    this.somaPontuacao = this.somaPontuacao.bind(this);
    this.teste = this.teste.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  randAnswers(c, i) {
    const { int } = this.state;
    if (int) {
      const inc = [...i];
      const rand = Math.floor(Math.random() * ((inc.length - 1) + 1));
      const swap = inc[rand];
      inc.splice(rand, 0);
      inc[rand] = c;
      return [...inc, swap];
    }
    this.setState({
      int: false,
    });
  }

  listenerChange() {
    this.setState({ isValid: true, isToggleOn: true, restart: false });
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
      int: true,
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

  saveRaking(score, name, gravatarEmail) {
    // fonte da lógica : https://pt.stackoverflow.com/questions/329223/armazenar-um-array-de-objetos-em-um-local-storage-com-js
    // Pega a lista já cadastrada, se não houver vira um array vazio
    const ranking = JSON.parse(localStorage.getItem('ranking') || '[]');
    // Adiciona pessoa ao cadastro
    ranking.push({
      name,
      score,
      picture: gravatarEmail,
    });

    // Salva a lista alterada
    localStorage.setItem('ranking', JSON.stringify(ranking));
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
    if (index === limit) {
      const { player: { gravatarEmail, name, score } } = getStorage();
      this.saveRaking(score, name, gravatarEmail);
      return <Redirect to="/feedback" />;
    }
    return (
      <Container>
        <Card>
          <Card.Header as="h2" data-testid="question-category">{array[index].category}</Card.Header>
          <Card.Body>
            <Card.Title as="h2" data-testid="question-text">{array[index].question}</Card.Title>
            <div className="answers">
              {this.randAnswers(array[index].correct_answer,
                array[index].incorrect_answers).map((answer, idx) => {
                const checkColor = answer === array[index].correct_answer
                  ? '3px solid rgb(6, 240, 15)'
                  : '3px solid rgb(255, 0, 0)';
                const test = answer === array[index].correct_answer
                  ? 'correct-answer' : `wrong-answer-${idx}`;
                const dataTestId = { 'data-testid': test };
                return (
                  <Button
                    className="answer-button"
                    style={ { border: `${next ? checkColor : ''}` } }
                    key={ answer }
                    type="button"
                    { ...dataTestId }
                    disabled={ isValid }
                    onClick={ () => this.somaPontuacao(dataTestId, array[index].difficulty) }
                  >
                    {answer}
                  </Button>
                );
              })}
            </div>
          </Card.Body>
        </Card>
        <Cronometro
          funcao={ this.listenerChange }
          funcaoStop={ this.teste }
          restart={ restart }
          stop={ value }
        />
        { isToggleOn ? (
          <Button
            className="next-button"
            type="button"
            data-testid="btn-next"
            onClick={ this.nextQuestion }
          >
            Proxima
          </Button>) : null }
      </Container>
    );
  }
}

Questions.propTypes = {
  funcao: PropTypes.func.isRequired,
};

export default Questions;
