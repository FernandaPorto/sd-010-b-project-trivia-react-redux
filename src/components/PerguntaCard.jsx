import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Timer from './Timer';
import { actionScore, actionAssertions } from '../redux/actions';

class PerguntaCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextStyle: 'hidden',
      correctAnswer: {},
      wrongAnswer: {},
      timer: 30,
    };
    this.checkAnswer = this.checkAnswer.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.setBorder = this.setBorder.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  setTimer() {
    const ONE_SECOND = 1000;
    this.timer = setInterval(() => {
      this.setState((oldState) => ({
        ...oldState,
        timer: oldState.timer - 1,
      }));
    }, ONE_SECOND);
  }

  setBorder() {
    return new Promise((resp) => (
      resp(
        this.setState((oldState) => ({
          ...oldState,
          nextStyle: 'visible',
          correctAnswer: { border: '3px solid rgb(6, 240, 15)' },
          wrongAnswer: { border: '3px solid rgb(255, 0, 0)' },
        })),
      )));
  }

  convertDifficulty(difficulty) {
    const threePoints = 3;
    const twoPoints = 2;
    const onePoint = 1;
    if (difficulty === 'hard') return threePoints;
    if (difficulty === 'medium') return twoPoints;
    if (difficulty === 'easy') return onePoint;
  }

  handleNext() {
    const { nextQuestion } = this.props;
    this.setState((oldState) => ({
      ...oldState,
      nextStyle: 'hidden',
      correctAnswer: {},
      wrongAnswer: {},
      timer: 30,
    }));
    nextQuestion();
    clearInterval(this.timer);
    this.setTimer();
  }

  checkAnswer({ target }) {
    this.setBorder().then(() => {
      clearInterval(this.timer);
      const { setScore, setAssertions } = this.props;
      const state = JSON.parse(localStorage.getItem('state'));
      const { timer } = this.state;
      if (target.value === 'correct') {
        const tenPoints = 10;
        state.player.assertions += 1;
        state.player.score
        += tenPoints
        + (timer * this.convertDifficulty(target.getAttribute('level')));
        localStorage.setItem('state', JSON.stringify(state));
      }
      setScore(state.player.score);
      setAssertions(state.player.assertions);
    });
  }

  // https://stackoverflow.com/questions/7394748/whats-the-right-way-to-decode-a-string-that-has-special-html-entities-in-it
  decodeHtml(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  renderTimer() {
    const { timer, nextStyle } = this.state;
    if (timer === 0 && nextStyle === 'hidden') {
      this.setBorder()
        .then(() => { clearInterval(this.timer); });
    }
    return (<Timer
      timer={ timer }
      setTimer={ this.setTimer }
    />);
  }

  renderQuestion() {
    const { question, options } = this.props;
    const { correctAnswer, wrongAnswer, timer, nextStyle } = this.state;
    const disab = timer === 0;
    return (
      <>
        <blockquote data-testid="question-category">{question.category}</blockquote>
        <h4 data-testid="question-text">{this.decodeHtml(question.question)}</h4>
        <ul>
          {
            // https://flaviocopes.com/how-to-shuffle-array-javascript/
            options.map((opt) => (
              <li key={ opt }>
                <button
                  style={ opt === question.correct_answer ? correctAnswer : wrongAnswer }
                  value={ opt === question.correct_answer ? 'correct' : 'wrong' }
                  type="button"
                  level={ question.difficulty }
                  data-testid={
                    opt === question.correct_answer
                      ? 'correct-answer'
                      : `wrong-answer-${options.indexOf(opt)}`
                  }
                  onClick={ this.checkAnswer }
                  className="optionsButtons"
                  disabled={ disab }
                >
                  {this.decodeHtml(opt)}

                </button>
              </li>))
          }
        </ul>
        <button
          type="button"
          style={ { visibility: nextStyle } }
          onClick={ this.handleNext }
          data-testid="btn-next"
        >
          Proxima pergunta

        </button>
      </>
    );
  }

  render() {
    return (
      <>
        {this.renderQuestion()}
        {this.renderTimer()}
      </>
    );
  }
}

PerguntaCard.propTypes = PropTypes.shape({
  question: PropTypes.instanceOf(Object),
  nextQuestion: PropTypes.func,
}).isRequired;

const mapDispatchToProps = (dispatch) => ({
  setScore: (data) => dispatch(actionScore(data)),
  setAssertions: (data) => dispatch(actionAssertions(data)),
});
export default connect(null, mapDispatchToProps)(PerguntaCard);
