import React from 'react';
import Header from '../components/Header';

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
    this.fetchQuestions();
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
      randomAnswer: { allAnswers, question: results[perguntaNumber].question },
    });
  }

  somaPergunta() {
    this.setState((previ) => ({
      perguntaNumber: previ.perguntaNumber + 1,
    }));
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
    const { perguntas: { results }, randomAnswer, perguntaNumber } = this.state;
    console.log(results);
    return (
      <section>
        <Header />
        <ol className="questions-section">
          {!results ? <p>carregando</p>
            : results.question[perguntaNumber]}
        </ol>
        <button type="button" onClick={ () => this.somaPergunta() }>random</button>}
      </section>
    );
  }
}

export default Jogo;
