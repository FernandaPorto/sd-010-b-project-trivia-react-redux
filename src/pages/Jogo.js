import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import PerguntaAtual from '../components/PerguntaAtual';

class Jogo extends React.Component {
  constructor(props) {
    super(props);
    this.answers = this.answers.bind(this);
    this.somaPergunta = this.somaPergunta.bind(this);
    this.buttonAvaliable = this.buttonAvaliable.bind(this);
    this.paintAnswerCorrect = this.paintAnswerCorrect.bind(this);
    this.paintAnswerIncorrect = this.paintAnswerIncorrect.bind(this);
    this.paintAll = this.paintAll.bind(this);
    this.state = {
      randomAnswer: {},
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
  }

  paintAnswerIncorrect() {
    const branco = document.getElementsByClassName('incorrect');
    for (let key = 0; key < branco.length; key += 1) {
      branco[key].style.border = 'none';
    }
  }

  paintAll() {
    this.paintAnswerIncorrect();
    this.paintAnswerCorrect();
  }

  renderNextButton() {
    const { buttonDisable } = this.state;
    if (buttonDisable) {
      return null;
    }
    return (
      <button
        data-testid="btn-next"
        type="button"
        onClick={ () => this.somaPergunta() }
        className="next-btn"
      >
        <span className="next-icon">&#10145;</span>
      </button>
    );
  }

  render() {
    const { randomAnswer } = this.state;
    return (
      <section>
        <Header />
        <section className="game-section">
          <PerguntaAtual
            randomAnswer={ randomAnswer }
            buttonAvaliable={ () => this.buttonAvaliable() }
          />
          { this.renderNextButton() }
        </section>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.user.questions,
});

Jogo.propTypes = {
  questions: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.shape({
      incorrect_answers: PropTypes.arrayOf(PropTypes.string),
      correct_answer: PropTypes.string,
      category: PropTypes.string,
      question: PropTypes.string,
    }).isRequired).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Jogo);
