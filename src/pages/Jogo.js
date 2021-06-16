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
    this.state = {
      randomAnswer: {},
      perguntaNumber: 0,
    };
  }

  componentDidMount() {
    return this.answers();
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
    }), () => this.answers());
  }

  render() {
    const { randomAnswer } = this.state;
    return (
      <section>
        <Header />
        <section className="game-section">
          <PerguntaAtual randomAnswer={ randomAnswer } />
          <button
            type="button"
            onClick={ () => this.somaPergunta() }
            className="next-btn"
          >
            Próxima Pergunta
          </button>
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
