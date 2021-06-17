import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeaderGame from '../components/HeaderGame';
import Answers from '../components/Answers';
import Stopwatch from '../components/Stopwatch';

class GamePlay extends React.Component {
  constructor() {
    super();

    this.state = {
      questionIndex: 0,
      timer: 30,
      isDisableAnswers: false,
    };

    this.runTimer = this.runTimer.bind(this);
    this.itsZero = this.itsZero.bind(this);
    this.isDisableAnswers = this.isDisableAnswers.bind(this);
  }

  isDisableAnswers() {
    this.setState({ isDisableAnswers: true, timer: 0 })
  }

  itsZero(timer) {
    if(timer === 0) this.isDisableAnswers();
  }


  runTimer() {
    const { timer: timerS } = this.state;
    if (timerS > 0) {
      this.setState({ timer: timerS - 1 }, this.itsZero(timerS - 1));
    }
  }

  render() {
    const { questionIndex, timer, isDisableAnswers } = this.state;
    const { questions } = this.props;

    return (
      <div>
        <HeaderGame />
        <div>
          <h3
            data-testid="question-category"
          >
            { questions && questions[questionIndex].category }
          </h3>
          <p
            data-testid="question-text"
          >
            { questions && questions[questionIndex].question }
          </p>
        </div>
        <div>
          { questions && <Answers
            correct={ questions[questionIndex].correct_answer }
            incorrect={ questions[questionIndex].incorrect_answers }
            isDisableAnswers={ isDisableAnswers }
            funcDisable={ this.isDisableAnswers }
          /> }
        </div>
        <div>
          <Stopwatch runTimer={ this.runTimer } timer={ timer } />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.triviaGame.questions,
});

GamePlay.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(GamePlay);
