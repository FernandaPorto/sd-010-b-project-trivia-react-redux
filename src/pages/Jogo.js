import React from 'react';
import Header from '../components/Header';
import PerguntaAtual from '../components/PerguntaAtual';

class Jogo extends React.Component {
  constructor(props) {
    super(props);
    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.answers = this.answers.bind(this);
    this.somaPergunta = this.somaPergunta.bind(this);
    this.state = {
      perguntas: {},
      randomAnswer: [],
      perguntaNumber: 0,
    };
  }

  componentDidMount() {
    this.fetchQuestions().then(() => this.answers());
  }

  fetchQuestions() {
    const userToken = JSON.parse(localStorage.getItem('token'));
    return fetch(`https://opentdb.com/api.php?amount=5&token=${userToken}`)
      .then((response) => response.json())
      .then((response) => {
        this.setState({ perguntas: response });
      });
  }

  answers() {
    const { perguntas: { results }, perguntaNumber } = this.state;
    const allAnswers = [...results[perguntaNumber].incorrect_answers];
    const numberOfQuestions = 5;
    const randomPosition = Math.floor(Math.random() * numberOfQuestions);
    allAnswers.splice(randomPosition, 0, results[perguntaNumber].correct_answer);
    this.setState({
      randomAnswer: { allAnswers,
        category: results[perguntaNumber].category,
        question: results[perguntaNumber].question,
        correctAnswer: results[perguntaNumber].correct_answer,
      },
    });
  }

  somaPergunta() {
    this.setState((previ) => ({
      perguntaNumber: previ.perguntaNumber + 1,
    }), () => this.answers());
    // this.answers();
  }

  // answers() {
  //   const { perguntas } = this.state;
  //   const allAnswers = [...perguntas.results[0].incorrect_answers, perguntas.results[0].correct_answer];
  //   this.shuffleArray(allAnswers);
  // }

  // shuffleArray(arr) {
  //   // Loop em todos os elementos
  //   for (let i = arr.length - 1; i > 0; i -= 1) {
  //     // Escolhendo elemento aleatório
  //     const j = Math.floor(Math.random() * (i + 1));
  //     // Reposicionando elemento
  //     [arr[i], arr[j]] = [arr[j], arr[i]];
  //   }
  //   // Retornando array com aleatoriedade
  //   this.setState({ randomAnswer: arr });
  // }
  // // https://www.horadecodar.com.br/2021/05/10/como-embaralhar-um-array-em-javascript-shuffle/

  render() {
    const { perguntas: { results }, randomAnswer } = this.state;
    console.log(results);
    console.log(randomAnswer);
    return (
      <section>
        <Header />
        <PerguntaAtual randomAnswer={ randomAnswer } />
        <button type="button" onClick={ () => this.somaPergunta() }>random</button>
      </section>
    );
  }
}

export default Jogo;