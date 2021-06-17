import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { revealedAction } from '../actions/gameAction';

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

  handleClick() {
    const { dispatchRevealed } = this.props;
    dispatchRevealed(true);
    // if (acertou) {
    //   count += 1
    // } else {
    //   coint -= 1
    // }
  }

  renderAnswer({ correct_answer: correctAnswer, incorrect_answers: incorrectAnswer }, isRevealed) {
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
    const { number, results, isRevealed } = this.props;
    // const incorrectAnswerStyles = { border: '3px solid rgb(255, 0, 0)' };
    // const correctAnswerStyles = { border: '3px solid rgb(6, 240, 15)' };
    if (!results[number]) {
      return <div>Carregando...</div>;
    }
    return (
      <div>
        { this.renderAnswer(results[0], isRevealed) }
        {/* { results[number].incorrect_answers.map((answer, idx) => (
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
        )) }
        <button
          onClick={ this.handleClick }
          type="button"
          data-testid="correct-answer"
          disabled={ isRevealed }
          style={ isRevealed ? correctAnswerStyles : null }
        >
          {results[number].correct_answer}
        </button> */}
      </div>
    );
  }
}

Answer.propTypes = {
  number: PropTypes.number.isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchRevealed: PropTypes.func.isRequired,
  isRevealed: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isRevealed: state.game.isRevealed,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchRevealed: (payload) => dispatch(revealedAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Answer);
