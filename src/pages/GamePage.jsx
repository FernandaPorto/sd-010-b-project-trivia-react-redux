import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import fetchURL from '../services/API';
import Header from '../components/Header';
import ButtonNextQuestion from '../components/ButtonNextQuestion';
import ButtonFeedback from '../components/ButtonFeedback';
import ButtonLogin from '../components/ButtonLogin';
import { scoreAction, eachScoreAction, assertionsAction } from '../actions';
import '../GamePageCss.css';

export const setToken = async () => {
  const token = await fetchURL();
  localStorage.setItem('token', JSON.stringify(token));
  const fetchTrivia = await fetch(`https://opentdb.com/api.php?amount=5&token=${token.token}`);
  const resposta = await fetchTrivia.json();
  const result = await resposta;
  return result;
};

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [{}],
      indexState: 0,
      loading: false,
      seconds: 30,
      answered: true,
      button: false,
      timeIsOut: false,
      finalQuestion: false,
    };

    this.getToken = this.getToken.bind(this);
    this.interval = this.interval.bind(this);
    this.questionAndAnswer = this.questionAndAnswer.bind(this);
    this.correctAnswer = this.correctAnswer.bind(this);
    this.wrongAnswer = this.wrongAnswer.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    this.interval();
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  async getToken() {
    const resultFetchTrivia = await setToken();
    const map = resultFetchTrivia.results
      .map((result) => result);
    this.setState({
      categories: map,
    });
  }

  async interval() {
    await this.getToken();
    const A_SECOND = 1000;
    const number = 28;
    this.myInterval = setInterval(() => {
      const { seconds = number } = this.state;
      if (seconds > 0) {
        this.setState((previousState) => ({
          seconds: previousState.seconds - 1,
        }));
      }
      if (seconds === 0) {
        this.nextQuestion();
        this.setState({ timeIsOut: true });
        this.setState({ loading: true });
        this.setState({ button: true });
        this.setState({ answered: false });
      }
    }, A_SECOND);
  }

  // finalQuestion() {
  //   const { indexState, categories } = this.state;
  //   const maxQuestionsNumber = 5;
  //   if (indexState <= maxQuestionsNumber) {
  //     return categories[indexState].question;
  //   }
  //   this.setState({ finalQuestion: true });
  // }

  correctAnswer() {
    const { categories, indexState, seconds } = this.state;
    const { eachQuestionScore, totalAssertions } = this.props;
    const level = categories[indexState].difficulty;
    const hard = 3;
    const standardNumber = 10;
    if (level === 'easy') {
      eachQuestionScore(standardNumber + seconds);
    } else if (level === 'medium') {
      eachQuestionScore(standardNumber + (seconds * 2));
    } else {
      eachQuestionScore(standardNumber + (seconds * hard));
    }
    this.setState({ loading: true });
    this.setState({ answered: false });
    this.setState({ button: true });
    console.log(eachQuestionScore);
    // localStorage.setItem('score', JSON.stringify(playerScore));
    this.componentWillUnmount();
    totalAssertions(1);
  }

  wrongAnswer() {
    this.setState({ loading: true });
    this.setState({ answered: false });
    this.setState({ button: true });
    this.componentWillUnmount();
  }

  nextQuestion() {
    const { indexState } = this.state;
    this.setState({ loading: false });
    this.setState({ answered: true });
    const maxQuestionsNumber = 5;
    if (indexState <= maxQuestionsNumber) {
      this.setState((previousState) => ({ indexState: previousState.indexState + 1 }));
    }
  }

  questionAndAnswer() {
    const { categories, indexState, loading, timeIsOut } = this.state;
    if (typeof (categories[indexState]) === 'undefined') {
      return <Redirect to="/feedback" />;
    }
    return (
      <div>
        <select>
          {categories.map((item, indexMap) => (
            <option
              data-testid="question-category"
              key={ indexMap }
            >
              {item.category}
            </option>))}
        </select>
        <section>
          <div
            role="button"
            tabIndex={ 0 }
            data-testid="question-text"
            key={ indexState }
          >
            {categories[indexState].question}
          </div>
        </section>
        <option
          className={ loading ? 'correct-answer' : '' }
          data-testid="correct-answer"
          onKeyDown={ timeIsOut ? '' : this.correctAnswer }
          onClick={ timeIsOut ? '' : this.correctAnswer }
        >
          {categories[indexState] === 'undefined' ? <Redirect to="/feedback" />
            : categories[indexState].correct_answer}
        </option>
        {categories[indexState] ? categories[indexState].incorrect_answers
        && categories[indexState].incorrect_answers.map((item, index) => (
          <option
            className={ loading ? 'incorrect-answers' : '' }
            onClick={ timeIsOut ? '' : this.wrongAnswer }
            data-testid={ `wrong-answer-${index}` }
            key={ index }
          >
            {item}
          </option>
        )) : ''}
      </div>
    );
  }

  render() {
    const { seconds, answered, button } = this.state;
    const { finalQuestion, categories, indexState } = this.state;
    return (
      <div>
        <Header />
        <div>
          {categories[indexState] === 'undefined' ? <Redirect to="/feedback" /> : '' }
          { this.questionAndAnswer() }
        </div>
        <div>
          { seconds > 0 ? `Timer:${seconds}` : '' }
          <ButtonLogin />
          <ButtonFeedback />
          { button ? <ButtonNextQuestion
            answered={ answered }
            // handleChange={ this.handleChange }
            nextQuestion={ this.nextQuestion }
            interval={ this.interval }
          />
            : ''}
        </div>
        {finalQuestion ? <Redirect to="/feedback" /> : '' }
      </div>
    );
  }
}

GamePage.propTypes = {
  eachQuestionScore: PropTypes.func.isRequired,
  totalAssertions: PropTypes.func.isRequired,
  // totalScore: PropTypes.number.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  playerScore: (score) => dispatch(scoreAction([score])),
  eachQuestionScore: (eachScore) => dispatch(eachScoreAction(eachScore)),
  totalAssertions: (rightAnswer) => dispatch(assertionsAction(rightAnswer)),
});

export default connect(null, mapDispatchToProps)(GamePage);
// https://betterprogramming.pub/building-a-simple-countdown-timer-with-react-4ca32763dda7
