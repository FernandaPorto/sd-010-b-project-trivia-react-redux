import React from 'react';

class PerguntaAtual extends React.Component {
  constructor() {
    super();
    this.answers = this.answers.bind(this);
    this.somaPergunta = this.somaPergunta.bind(this);
    this.somaPergunta = this.somaPergunta.bind(this);
    this.state = {
      perguntas: {},
      randomAnswer: [],
      perguntaNumber: 0,
    };
  }

  answers() {
    const { perguntas: { results }, perguntaNumber } = this.state;
    const allAnswers = [...results[perguntaNumber].incorrect_answers];
    const numberOfQuestions = 5;
    const randomPosition = Math.floor(Math.random() * numberOfQuestions);
    allAnswers.splice(randomPosition, 0, results[perguntaNumber].correct_answer);
    this.setState({
      randomAnswer: allAnswers,
    });
  }

  somaPergunta() {
    this.setState((previ) => ({
      perguntaNumber: previ.perguntaNumber + 1,
    }));
  }

  render() {
    return (
      <div>pergunta aqui</div>
    );
  }
}

export default PerguntaAtual;
