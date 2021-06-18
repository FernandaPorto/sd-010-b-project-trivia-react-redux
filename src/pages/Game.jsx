import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';

import Questions from '../components/Questions';
import GameHeader from '../components/GameHeader';
import Timer from '../components/Timer';

const NUMBER_FIVE = 5;
const NUMBER_FOUR = 4;
let timer;

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      time: 30,
      disabled: false,
      nextButton: false,
      order: [],
    };

    this.getQuestions = this.getQuestions.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.decreaseTime = this.decreaseTime.bind(this);
    this.timerHasMounted = this.timerHasMounted.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.randomQuestions = this.randomQuestions.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const localToken = localStorage.getItem('token');
    const { results } = await (await fetch(`https://opentdb.com/api.php?amount=5&token=${localToken}`)).json();
    const order = this.randomQuestions(results[0]);
    this.setState({
      results,
      order,
    });
  }

  randomQuestions({ incorrect_answers: iA, correct_answers: cA }) {
    const allQuestionsLength = [...iA, cA];
    const random = allQuestionsLength.map((_item, index) => index);
    const zeroDotFive = 0.5;
    random.sort(() => Math.random() - zeroDotFive);
    return random;
  }

  handleNext(results) {
    this.showAnswersByColor();
    const order = this.randomQuestions(results);
    this.setState((prevState) => ({
      count: prevState.count + 1,
      disabled: false,
      time: 30,
      nextButton: false,
      order,
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

  render() {
    const { results, count, time, disabled, nextButton, order } = this.state;
    const { name, gravatarEmail, score } = this.props;
    const index = count < NUMBER_FOUR ? count + 1 : count;
    if (count === NUMBER_FIVE) {
      return (<Redirect to="/feedback" />);
    }

    if (results) {
      return (
        <section>
          <header>
            <GameHeader name={ name } gravatarEmail={ gravatarEmail } score={ score } />
          </header>
          <main>
            <Questions
              name={ name }
              gravatarEmail={ gravatarEmail }
              score={ score }
              result={ results[count] }
              disabled={ disabled }
              time={ time }
              stopTimer={ this.stopTimer }
              order={ order }
            />
            { nextButton === true ? (
              <button
                type="button"
                onClick={ () => { this.handleNext(results[index]); } }
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
  const { player: { name, gravatarEmail, score, assertions } } = state;
  return { name, gravatarEmail, score, assertions };
};

Game.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
