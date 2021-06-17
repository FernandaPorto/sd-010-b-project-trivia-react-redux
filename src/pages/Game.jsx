import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';

import Question from '../components/Question';
import GameHeader from '../components/GameHeader';
import Timer from '../components/Timer';

let timer;
const FIVE = 5;

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerDisabled: false,
      time: 30,
      questionIndex: 0,
    };

    this.getQuestions = this.getQuestions.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
    this.decreaseTime = this.decreaseTime.bind(this);
    this.timerHasMounted = this.timerHasMounted.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const { token } = this.props;
    const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const { results } = await request.json();
    this.setState({
      questions: results,
    });
  }

  handleNextQuestion() {
    this.setState((prevState) => ({
      questionIndex: prevState.questionIndex + 1,
      time: 30,
      answerDisabled: false,
    }),
    () => this.timerHasMounted());
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
      answerDisabled: true,
    }, () => clearInterval(timer));
  }

  timerHasMounted() {
    const ONE_SECOND = 1000;
    timer = setInterval(this.decreaseTime, ONE_SECOND);
  }

  render() {
    const { questions, questionIndex, answerDisabled, time } = this.state;

    if (questionIndex === FIVE) {
      return (<Redirect to="/" />);
    }

    return (
      <section>
        <GameHeader />
        <main>
          { questions ? (
            <main>
              <Question
                result={ questions[questionIndex] }
                handleNext={ this.handleNextQuestion }
                answerDisabled={ answerDisabled }
                stopTimer={ this.stopTimer }
              />
              <Timer time={ time } hasMounted={ this.timerHasMounted } />
            </main>
          ) : <p>Loading...</p> }
        </main>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const { player: { token } } = state;
  return {
    token,
  };
};

Game.propTypes = {
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
