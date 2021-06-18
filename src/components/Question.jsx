/* eslint-disable no-nested-ternary */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Questionaire from './Questionaire';
import { assertionsPlayer, scorePlayer } from '../actions';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.getQuestions = this.getQuestions.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleAssertions = this.handleAssertions.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
    this.handleTimer = this.handleTimer.bind(this);
    this.handleScore = this.handleScore.bind(this);

    this.state = {
      questions: [],
      currentIndex: 0,
      assertions: 0,
      score: 0,
      showAnswers: false,
      colorGreen: '',
      colorRed: '',
      isRedirect: false,
      timer: 30,
      isDisable: false,
    };
  }

  componentDidMount() {
    this.getQuestions();
    this.handleTimer();
  }

  async getQuestions() {
    const { tok } = this.props;
    const apiQuestion = (`https://opentdb.com/api.php?amount=5&token=${tok}`);
    const response = await fetch(apiQuestion);
    const data = await response.json();
    this.setState({
      questions: data.results,
    });
  }

  handleTimer() {
    const ONE_SECOND = 1000;
    this.interval = setInterval(() => {
      const { timer } = this.state;
      this.setState((prev) => ({
        timer: (prev.timer - 1),
      }));
      if (timer === 1) {
        clearInterval(this.interval);
        this.setState({
          isDisable: true,
          showAnswers: true,
        });
      }
    }, ONE_SECOND);
  }

  handleAnswer(answer) {
    const { currentIndex,
      questions,
      assertions,
      showAnswers } = this.state;
    if ((!showAnswers) && answer === questions[currentIndex].correct_answer) {
      this.setState({
        assertions: assertions + 1,
      });
    }

    this.setState({
      showAnswers: true,
      colorRed: '3px solid rgb(255, 0, 0)',
      colorGreen: '3px solid rgb(6, 240, 15)',
    });
  }

  handleAssertions() {
    const { assertions } = this.state;
    const { points } = this.props;
    points({ assertions });
  }

  handleScore(questions) {
    const { timer, score } = this.state;
    const inicitalScore = 10;
    const easy = 1;
    const medium = 2;
    const hard = 3;
    switch (questions.difficulty) {
    case 'easy':
      this.setState((prev) => ({
        score: prev.score + inicitalScore + (timer * easy),
      }));
      break;
    case 'medium':
      this.setState((prev) => ({
        score: prev.score + inicitalScore + (timer * medium),
      }));
      break;
    case 'hard':
      this.setState((prev) => ({
        score: prev.score + inicitalScore + (timer * hard),
      }));
      break;
    default:
      return score;
    }
  }

  handleNextQuestion() {
    const { currentIndex, questions } = this.state;
    if (currentIndex >= questions.length - 1) {
      this.handleAssertions();
      this.setState({
        isRedirect: true,
      });
    }
    this.setState({
      showAnswers: false,
      currentIndex: currentIndex + 1,
      colorGreen: '1px solid rgb(0, 0, 0)',
      colorRed: '1px solid rgb(0, 0, 0)',
      timer: 30,
      isDisable: false,
    });
  }

  render() {
    const { questions,
      currentIndex,
      showAnswers,
      colorRed,
      colorGreen,
      isRedirect,
      timer,
      isDisable } = this.state;
    console.log(questions);
    return questions.length > 0 ? (
      <div className="container">
        {isRedirect ? (
          <Redirect to="/score" />
        ) : (
          <div>
            { timer }
            <Questionaire
              data={ questions[currentIndex] }
              showAnswers={ showAnswers }
              colorRed={ colorRed }
              colorGreen={ colorGreen }
              handleNextQuestion={ this.handleNextQuestion }
              handleAnswer={ this.handleAnswer }
              handleAssertions={ this.handleAssertions }
              isDisable={ isDisable }
            />
          </div>
        )}
      </div>
    ) : (
      <h2>Loading...</h2>
    );
  }
}

const mapStateToProps = (state) => ({
  tok: state.api.token,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  points: (assertions) => dispatch(assertionsPlayer(assertions)),
  totalScore: (score) => dispatch(scorePlayer(score)),
});

Question.propTypes = {
  tok: PropTypes.string.isRequired,
  points: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
