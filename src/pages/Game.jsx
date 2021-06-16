import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';

import Questions from '../components/Questions';
import GameHeader from '../components/GameHeader';
import Timer from '../components/Timer';
import { sumScore, resetScore } from '../actions';

const NUMBER_FIVE = 5;
const NUMBER_TEN = 10;
let timer;

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      time: 30,
      disabled: false,
      nextButton: false,
    };

    this.getQuestions = this.getQuestions.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.decreaseTime = this.decreaseTime.bind(this);
    this.timerHasMounted = this.timerHasMounted.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.doTheMath = this.doTheMath.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const localToken = localStorage.getItem('token');
    const { results } = await (await fetch(`https://opentdb.com/api.php?amount=5&token=${localToken}`)).json();
    this.setState({
      results,
    });
  }

  handleNext() {
    this.showAnswersByColor();
    this.setState((prevState) => ({
      count: prevState.count + 1,
      disabled: false,
      time: 30,
      nextButton: false,
    }),
    () => this.timerHasMounted());
  }

  showAnswersByColor() {
    const correct = document.querySelector('.correct');
    const wrong = document.querySelectorAll('.wrong');

    correct.style.border = null;
    wrong.forEach((answer) => {
      answer.style.border = null;
    });
  }

  decreaseTime() {
    const { time } = this.state;
    if (time > 1) {
      this.setState((prevState) => ({
        time: prevState.time - 1,
      }));
    } else {
      this.setState((prevState) => ({
        time: prevState.time - 1,
      }),
      () => this.stopTimer());
    }
  }

  stopTimer() {
    this.setState({
      disabled: true,
      nextButton: true,
    }, () => clearInterval(timer));
  }

  timerHasMounted() {
    const ONE_SECOND = 1000;
    timer = setInterval(this.decreaseTime, ONE_SECOND);
  }

  doTheMath(totalPoints) {
    const { time, results, count } = this.state;
    const level = results[count].difficulty;
    const difficulty = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    return totalPoints(NUMBER_TEN + (time * difficulty[level]));
  }

  render() {
    const { results, count, time, disabled, nextButton } = this.state;
    const { name, gravatarEmail, score, totalPoints, zeroScore } = this.props;

    if (count === NUMBER_FIVE) {
      zeroScore();
      return (<Redirect to="/" />);
    }

    if (results) {
      return (
        <section>
          <header>
            <GameHeader name={ name } gravatarEmail={ gravatarEmail } score={ score } />
          </header>
          <main>
            <Questions
              result={ results[count] }
              disabled={ disabled }
              stopTimer={ this.stopTimer }
              doTheMath={ () => this.doTheMath(totalPoints) }
            />
            { nextButton === true ? (
              <button
                type="button"
                onClick={ () => this.handleNext(totalPoints) }
                data-testid="btn-next"
              >
                Next
              </button>) : null }
            <Timer time={ time } hasMounted={ this.timerHasMounted } />
          </main>
        </section>

      );
    }

    return (
      <section>
        <GameHeader name={ name } gravatarEmail={ gravatarEmail } score={ score } />
        <main>
          Loading...
        </main>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const { player: { name, gravatarEmail, score } } = state;
  return { name, gravatarEmail, score };
};

const mapDispatchToProps = (dispatch) => ({
  totalPoints: (score) => dispatch(sumScore(score)),
  zeroScore: () => dispatch(resetScore()),
});

Game.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  totalPoints: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
