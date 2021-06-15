import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GameHeader from '../components/GameHeader';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      indexQuestion: 0,
      playerClicked: false,
    });

    this.renderPage = this.renderPage.bind(this);
  }

  renderPage() {
    const { indexQuestion, playerClicked } = this.state;
    const { apiResult } = this.props;
    const correctAnswer = 'correct-answer';

    function correctOrWrongAnswerClass(answer, resultadoAPI, indexQuestao) {
      return answer
      === resultadoAPI.results[indexQuestao].correct_answer
        ? '3px solid rgb(6, 240, 15)' : '3px solid rgb(255, 0, 0)';
    }

    if (apiResult.response_code === 0) {
      const NUMERO_PARA_SORTEAR_RESPOSTAS = 5.0;
      const answersArray = apiResult.results[indexQuestion].incorrect_answers
        .concat(apiResult.results[indexQuestion].correct_answer);
      answersArray.sort(() => Math.random() - NUMERO_PARA_SORTEAR_RESPOSTAS);
      return (
        <section>
          <p
            data-testid="question-category"
          >
            { apiResult.results[indexQuestion].category }
          </p>
          <p data-testid="question-text">{ apiResult.results[indexQuestion].question }</p>
          { answersArray.map((answer, index) => (
            <button
              data-testid={ answer === apiResult.results[indexQuestion].correct_answer
                ? correctAnswer : `wrong-answer-${index}` }
              id={ answer === apiResult.results[indexQuestion].correct_answer
                ? correctAnswer : 'wrong-answer' }
              key={ index }
              type="submit"
              style={ { border: playerClicked
                ? correctOrWrongAnswerClass(answer, apiResult, indexQuestion) : null } }
              onClick={ () => this.setState({ playerClicked: true },
                () => this.setState({ indexQuestion: indexQuestion + 1 })) }
            >
              {answer}
            </button>))}

        </section>
      );
    }
  }

  render() {
    return (
      <section>
        <GameHeader />
        {this.renderPage()}
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
