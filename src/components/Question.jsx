import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../App.css';
import { updateAssertions, updateScore } from '../actions/player';
import Answer from './Answer';
import ButtonNextQuestion from './ButtonNextQuestion';
// import ButtonFeedback from './ButtonFeedback';

const LEVEL = 2;
const RAMDOM = 0.5;
const MIN_SCORE = 10;
const CORRECT_ANSWER = 'correct-answer';
const WRONG_ANSWER = 'wrong-answer';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.calcQuestionScore = this.calcQuestionScore.bind(this);
    this.setAnswersProperties = this.setAnswersProperties.bind(this);
  }

  componentDidMount() {
    this.setAnswersProperties();
  }

  componentDidUpdate() {
    const { player } = this.props;
    localStorage.setItem('state', JSON.stringify({ player }));
  }

  setAnswersProperties() {
    const { controls: { questionIndex }, questions } = this.props;
    const wrongAnswers = questions[questionIndex]
      .incorrect_answers.map((answer, index) => ({
        answer,
        name: WRONG_ANSWER,
        testid: `${WRONG_ANSWER}-${index}`,
        className: false,
      }));
    const answers = (
      [
        {
          answer: `${questions[questionIndex].correct_answer} ## CORRETA ##`,
          name: CORRECT_ANSWER,
          testid: CORRECT_ANSWER,
          className: true,
        },
        ...wrongAnswers,
      ].sort(() => Math.random() - RAMDOM) // https://stackoverflow.com/questions/49555273/how-to-shuffle-an-array-of-objects-in-javascript
    );
    this.setState({
      answers,
    });
  }

  calcQuestionScore() {
    const { controls: { questionIndex, timer }, questions,
      assertionsUpdate, scoreUpdate } = this.props;

    let questionLevel = questions[questionIndex].difficulty;
    if (questionLevel === 'hard') {
      questionLevel = LEVEL + 1;
    } else if (questionLevel === 'medium') {
      questionLevel = LEVEL;
    } else {
      questionLevel = LEVEL - 1;
    }
    const questionScore = MIN_SCORE + (timer * questionLevel);
    scoreUpdate(questionScore);
    assertionsUpdate();
  }

  render() {
    const { answers } = this.state;
    const { controls: { questionIndex, redirect }, questions } = this.props;
    const { category, question } = questions[questionIndex];
    return (
      <div>
        <p data-testid="question-category">{`Categoria: ${category}`}</p>
        <p data-testid="question-text">{`Pergunta: ${question}`}</p>
        {answers
        && <Answer answers={ answers } calcQuestionScore={ this.calcQuestionScore } />}
        {!redirect
        && <ButtonNextQuestion setAnswersProperties={ this.setAnswersProperties } />}
      </div>
    );
  }
}

Question.propTypes = {
  controls: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number,
    ]),
  ).isRequired,
  player: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  ).isRequired,
  questions: PropTypes.arrayOf(PropTypes.any).isRequired,
  assertionsUpdate: PropTypes.func.isRequired,
  scoreUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = ({ controls, player }) => ({ controls, player });

const mapDispatchToProps = (dispatch) => ({
  assertionsUpdate: (assertions) => dispatch(updateAssertions(assertions)),
  scoreUpdate: (score) => dispatch(updateScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
