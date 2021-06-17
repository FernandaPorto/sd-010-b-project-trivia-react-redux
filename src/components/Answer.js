import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { revealedAction } from '../actions/gameAction';
import correctAnswers from '../actions/correctAnswer';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.renderAnswer = this.renderAnswer.bind(this);
    this.setRandomIdx = this.setRandomIdx.bind(this);

    this.state = {
      randonIdx: '',
    };
  }

  componentDidMount() {
    // const { results, isRevealed } = this.props;
    this.setRandomIdx();
  }

  setRandomIdx() {
    // http://devfuria.com.br/javascript/numeros-aleatorios/
    const NUMBER_OF_ANSWERS = 4;
    const randonIdx = Math.floor(Math.random() * NUMBER_OF_ANSWERS);
    this.setState({
      randonIdx,
    });
  }

  transformDifficulty({ difficulty }) {
    const TRES = 3;
    if (difficulty === 'easy') {
      console.log('easy');
      return 1;
    }
    if (difficulty === 'medium') {
      console.log('medium');
      return 2;
    }

    return TRES;
  }

  handleClick({ target }) {
    const {
      dispatchRevealed, pointsCalculate, time, results, number,
    } = this.props;
    const DEZ = 10;
    dispatchRevealed(true);
    if (target.className === 'correct-answer') {
      const difficulty = this.transformDifficulty(results[number]);
      console.log(difficulty);
      const total = DEZ + (time * difficulty);
      console.log(total);
      pointsCalculate(total);
      const { player } = JSON.parse(localStorage.getItem('state'));
      player.score += total;
      player.assertions += 1;
      localStorage.setItem('state', JSON.stringify({ player }));
    }
  }

  renderAnswer(
    { correct_answer: correctAnswer, incorrect_answers: incorrectAnswer },
    isRevealed,
  ) {
    const incorrectAnswerStyles = { border: '3px solid rgb(255, 0, 0)' };
    const correctAnswerStyles = { border: '3px solid rgb(6, 240, 15)' };
    const btnsWrong = (
      incorrectAnswer.map((answer, idx) => (
        <button
          onClick={ this.handleClick }
          data-testid={ `wrong-answer-${idx}` }
          type="button"
          key={ idx }
          disabled={ isRevealed }
          style={ isRevealed ? incorrectAnswerStyles : null }
        >
          {answer}
        </button>
      ))
    );
    const btnRight = (
      <button
        type="button"
        onClick={ this.handleClick }
        className="correct-answer"
        data-testid="correct-answer"
        key="3"
        disabled={ isRevealed }
        style={ isRevealed ? correctAnswerStyles : null }
      >
        { correctAnswer }
      </button>
    );
    const { randonIdx } = this.state;
    // https://www.mundojs.com.br/2018/08/31/adicionando-elementos-em-uma-lista-array-javascript/
    btnsWrong.splice(randonIdx, 0, btnRight);

    return (
      <div>
        { btnsWrong }
      </div>
    );
  }

  render() {
    const { number, results, isRevealed, nextQuestion } = this.props;
    if (!results[number]) {
      return <div>Carregando...</div>;
    }
    return (
      <div>
        { this.renderAnswer(results[number], isRevealed) }
        { isRevealed && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ nextQuestion }
          >
            Próxima
          </button>)}
      </div>
    );
  }
}

Answer.propTypes = {
  number: PropTypes.number.isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchRevealed: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  isRevealed: PropTypes.bool.isRequired,
  pointsCalculate: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  isRevealed: state.game.isRevealed,
  time: state.game.time,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchRevealed: (payload) => dispatch(revealedAction(payload)),
  pointsCalculate: (score) => dispatch(correctAnswers(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Answer);
