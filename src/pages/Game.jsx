import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { startTimer, downTimer, resetTimer, isAnswered } from '../actions';
import GameHeader from '../components/GameHeader';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';

class Game extends Component {
  constructor() {
    super();
    this.nextAnswer = this.nextAnswer.bind(this);
    this.goFeedback = this.goFeedback.bind(this);
    this.state = {
      index: 0,
      numQ: 4,
      redirect: false,
    };
  }

  componentDidMount() {
    const { propStartTimer } = this.props;
    propStartTimer();
  }

  componentDidUpdate(prev) {
    const { answered, ticTac, time, propIsAnswered } = this.props;
    if (time === 0 && prev.answered === false) propIsAnswered(true);
    if (answered && prev.answered === false) clearInterval(ticTac);
  }

  nextAnswer() {
    const { propStartTimer, propResetTimer, propIsAnswered } = this.props;
    this.setState((prev) => ({ index: prev.index + 1 }));
    propIsAnswered(false);
    propResetTimer();
    propStartTimer();
  }

  goFeedback() {
    this.setState({ redirect: true });
  }

  render() {
    const { questions, answered } = this.props;
    const { index, numQ, redirect } = this.state;
    if (questions) {
      return redirect ? <Redirect to="/feedback" /> : (
        <>
          <GameHeader />
          <Timer />
          <QuestionCard question={ questions[index] } />
          <button
            data-testid="btn-next"
            type="button"
            hidden={ !answered }
            onClick={
              index === numQ ? () => this.goFeedback() : () => this.nextAnswer()
            }
          >
            { index === numQ ? 'Continuar' : 'Próxima' }
          </button>
        </>
      );
    }
    return (
      <div>Loading...</div>
    );
  }
}

const mapStateToProps = ({ gameReducer: { data: { results } },
  timerReducer: { answered, ticTac, time } }) => ({
  questions: results, answered, ticTac, time });

const mapDispatchToProps = (dispatch) => ({
  propStartTimer: () => {
    const interval = 1000;
    const ticTac = setInterval(() => { dispatch(downTimer()); }, interval);
    dispatch(startTimer(ticTac));
  },
  propResetTimer: () => dispatch(resetTimer()),
  propIsAnswered: (payload) => dispatch(isAnswered(payload)),
});

Game.propTypes = {
  questions: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
