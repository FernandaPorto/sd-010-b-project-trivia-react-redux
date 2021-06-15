import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GameHeader from '../components/GameHeader';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      indexQuestion: 0,
      buttonDisabled: false,
    });

    this.renderPage = this.renderPage.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  componentDidMount() {
    const tempo = 30;

    this.startTimer(tempo);
  }

  startTimer(duration) {
    const ONE_SEC = 1000;
    const MINUTO = 60;
    const DIGITO_DECIMAL = 10;
    let timer = duration;
    const display = document.getElementById('timer');
    let seconds;
    setInterval(() => {
      seconds = parseInt(timer % MINUTO, 10);

      // a seguinte linha exibe, por exemplo, 03 ao invés de 3 no timer
      seconds = seconds < DIGITO_DECIMAL ? `0${seconds}` : seconds;
      display.textContent = `Tempo restante: ${seconds}`;
      timer -= 1;
      if (timer < 0) {
        timer = 0;
        this.setState({
          buttonDisabled: true,
        });
      }
    }, ONE_SEC);
  }

  handleClick() {
    const wrongAnswer = document.querySelectorAll('.answer-button-wrong');
    const correctAnswer = document.querySelector('.answer-button-correct');
    correctAnswer.style.border = '3px solid rgb(6, 240, 15)';
    wrongAnswer.forEach((answer) => {
      answer.style.border = '3px solid rgb(255, 0, 0)';
      /* botão de próxima pergunta = () => this.setState({ indexQuestion: indexQuestion + 1 }) */
    });
  }

  renderPage() {
    const { indexQuestion, buttonDisabled } = this.state;
    const { apiResult } = this.props;

    if (apiResult.response_code === 0) {
      const NUMERO_PARA_SORTEAR_RESPOSTAS = 0.5;
      const answersArray = apiResult.results[indexQuestion].incorrect_answers
        .concat(apiResult.results[indexQuestion].correct_answer);
      answersArray.sort(() => NUMERO_PARA_SORTEAR_RESPOSTAS - Math.random());
      return (
        <section>
          <p
            data-testid="question-category"
          >
            { apiResult.results[indexQuestion].category }
          </p>
          <p data-testid="question-text">{ apiResult.results[indexQuestion].question }</p>
          <section className="section-answer-buttons">
            { answersArray.map((answer, index) => (
              <button
                data-testid={ answer === apiResult.results[indexQuestion].correct_answer
                  ? 'correct-answer' : `wrong-answer-${index}` }
                key={ index }
                type="submit"
                disabled={ buttonDisabled }
                className={ answer === apiResult.results[indexQuestion].correct_answer
                  ? 'answer-button-correct' : 'answer-button-wrong' }
                onClick={ this.handleClick }
              >
                {answer}
              </button>))}
          </section>
        </section>
      );
    }
  }

  render() {
    return (
      <section>
        <GameHeader />
        {this.renderPage()}
        <p id="timer">Tempo restante:</p>
      </section>

    );
  }
}

const mapStateToProps = (state) => ({
  apiResult: state.game,
});

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  apiResult: PropTypes.shape({
    response_code: PropTypes.number.isRequired,
    results: PropTypes.shape({}),
  }).isRequired,
};
