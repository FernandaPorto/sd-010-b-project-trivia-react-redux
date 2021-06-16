import React from 'react';
import Header from '../components/Header';
import PerguntaAtual from '../components/PerguntaAtual';
import { connect } from 'react-redux'

class Jogo extends React.Component {
  constructor(props) {
    super(props);
    // this.fetchQuestions = this.fetchQuestions.bind(this);
    this.answers = this.answers.bind(this);
    this.somaPergunta = this.somaPergunta.bind(this);
    this.buttonAvaliable = this.buttonAvaliable.bind(this);
    this.paintAnswerCorrect = this.paintAnswerCorrect.bind(this);
    this.paintAnswerIncorrect = this.paintAnswerIncorrect.bind(this);
    this.paintAll = this.paintAll.bind(this);
    this.state = {
      perguntas: {},
      randomAnswer: [],
      perguntaNumber: 0,
      buttonDisable: true,
    };
  }

  componentDidMount() {
    return this.answers();
  }

  buttonAvaliable() {
    this.setState({
      buttonDisable: false,
    });
  }
  // fetchQuestions() {
  //   const userToken = JSON.parse(localStorage.getItem('token'));
  //   return fetch(`https://opentdb.com/api.php?amount=5&token=${userToken}`)
  //     .then((response) => response.json())
  //     .then((response) => {
  //       this.setState({ perguntas: response }, () => this.answers());
  //     });
  // }

  answers() {
    const { perguntaNumber } = this.state;
    const { questions: { results } } = this.props;
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
      buttonDisable: true,
    }), () => this.answers());
    this.paintAll();
  }

  paintAnswerCorrect() {
    const correct = document.getElementById('correct');
    correct.style.border = 'none';
    correct.style.boxShadow = 'none';
  }

  paintAnswerIncorrect() {
    const branco = document.getElementsByClassName('incorrect');
    for (let key = 0; key < branco.length; key += 1) {
      branco[key].style.border = 'none';
      branco[key].style.boxShadow = 'none';
    }
  }

  paintAll() {
    this.paintAnswerIncorrect();
    this.paintAnswerCorrect();
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
    const { randomAnswer, buttonDisable } = this.state;
    return (
      <section>
        <Header />
        <PerguntaAtual randomAnswer={ randomAnswer } buttonAvaliable={ () => this.buttonAvaliable() } />
        {buttonDisable === true ? null : <button data-testid="btn-next" type="button" onClick={ () => this.somaPergunta() }>Próxima</button> }
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.user.questions,
});

export default connect(mapStateToProps)(Jogo);
