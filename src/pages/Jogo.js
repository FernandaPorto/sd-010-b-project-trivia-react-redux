import React from 'react';
import Header from '../components/Header';

class Jogo extends React.Component {
  constructor(props) {
    super(props);
    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.answers = this.answers.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.state = {
      perguntas: {},
      randomAnswer: [],
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
    const { perguntas } = this.state;
    const allAnswers = [...perguntas.results[0].incorrect_answers, perguntas.results[0].correct_answer];
    this.shuffleArray(allAnswers);
  }

  shuffleArray(arr) {
    // Loop em todos os elementos
    for (let i = arr.length - 1; i > 0; i -= 1) {
      // Escolhendo elemento aleatório
      const j = Math.floor(Math.random() * (i + 1));
      // Reposicionando elemento
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Retornando array com aleatoriedade
    this.setState({ randomAnswer: arr });
  }
  // https://www.horadecodar.com.br/2021/05/10/como-embaralhar-um-array-em-javascript-shuffle/

  render() {
    const { perguntas: { results }, randomAnswer } = this.state;
    console.log(randomAnswer);
    return (
      <section>
        <Header />
        <ol>
          {!results ? <p>carregando</p> : results.map((question, index) => (
            <li key={ index }>
              <div>
                {question.question}
              </div>
              <button type="button" onClick={ () => this.answers() }>random</button>
            </li>))}
        </ol>
      </section>
    );
  }
}

export default Jogo;
