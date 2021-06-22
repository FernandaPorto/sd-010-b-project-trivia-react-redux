import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
// import fetchURL from '../services/API';
import Header from '../components/Header';
import ButtonNextQuestion from '../components/ButtonNextQuestion';
import ButtonFeedback from '../components/ButtonFeedback';
import ButtonLogin from '../components/ButtonLogin';
import { scoreAction, eachScoreAction, assertionsAction } from '../actions';
import '../GamePageCss.css';
import { setToken } from '../services/API';

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
      disabledCorrectIncorrect: false,
      finalQuestion: false,
    };
    this.interval = this.interval.bind(this);
    this.questionAndAnswer = this.questionAndAnswer.bind(this);
    this.correctAnswer = this.correctAnswer.bind(this);
    this.wrongAnswer = this.wrongAnswer.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.getApiData = this.getApiData.bind(this);
  }

  componentDidMount() {
    this.interval();
    this.getApiData();
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
    console.log('WillUnmount');
  }

  async getApiData() {
    const resultOfFetch1 = await setToken();
    const categories = resultOfFetch1.results.map((result) => result);
    this.setState({ categories });
  }

  // getToken = async () => {
  //   const resultFetchTrivia = await setToken();
  //   const map = resultFetchTrivia.results
  //     .map((result) => result);
  //   this.setState({
  //     resultOfFetch: map,
  //   });
  // }

  async interval() {
    const A_SECOND = 1000;
    this.myInterval = setInterval(() => {
      const { seconds } = this.state;
      if (seconds > 0) {
        this.setState((previousState) => ({
          seconds: previousState.seconds - 1,
        }));
      }
      if (seconds === 0) {
        this.setState({ disabledCorrectIncorrect: true });
        this.setState({ loading: true });
        this.setState({ button: true });
        this.setState({ answered: false });
        console.log('interval');
        this.componentWillUnmount();
      }
    }, A_SECOND);
  }

  correctAnswer() {
    const { indexState, seconds, categories } = this.state;
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
    this.componentWillUnmount();
    totalAssertions(1);
    console.log('interval');
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
    this.setState({ seconds: 30 });
    this.setState({ answered: true });
    this.setState({ disabledCorrectIncorrect: false });
    const maxQuestionsNumber = 5;
    if (indexState <= maxQuestionsNumber) {
      this.setState((previousState) => ({ indexState: previousState.indexState + 1 }));
    } else { this.setState({ finalQuestion: true }); }
    console.log(indexState);
  }

  questionAndAnswer() {
    const { indexState, loading, disabledCorrectIncorrect, categories } = this.state;
    console.log(indexState);
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
            {categories[indexState].question ? categories[indexState].question : ''}
          </div>
        </section>
        <option
          className={ loading ? 'correct-answer' : '' }
          data-testid="correct-answer"
          onKeyDown={ this.correctAnswer }
          onClick={ this.correctAnswer }
          disabled={ disabledCorrectIncorrect }
        >
          {categories[indexState] === 'undefined' ? <Redirect to="/feedback" />
            : categories[indexState].correct_answer}
        </option>
        {categories[indexState] ? categories[indexState].incorrect_answers
        && categories[indexState].incorrect_answers.map((item, index) => (
          <option
            className={ loading ? 'incorrect-answers' : '' }
            onClick={ this.wrongAnswer }
            data-testid={ `wrong-answer-${index}` }
            key={ index }
            disabled={ disabledCorrectIncorrect }
          >
            {item}
          </option>
        )) : ''}
      </div>
    );
  }

  render() {
    const { seconds, answered, button, finalQuestion } = this.state;
    const { categories, indexState } = this.state;
    return (
      <div>
        <Header />
        {categories[indexState] ? this.questionAndAnswer() : <Redirect to="/feedback" /> }
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
          {finalQuestion ? <Redirect to="/feedback" /> : ''}
        </div>
      </div>
    );
  }
}

GamePage.propTypes = {
  eachQuestionScore: PropTypes.func.isRequired,
  totalAssertions: PropTypes.func.isRequired,
  // resultOfFetch: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  playerScore: (score) => dispatch(scoreAction([score])),
  eachQuestionScore: (eachScore) => dispatch(eachScoreAction(eachScore)),
  totalAssertions: (rightAnswer) => dispatch(assertionsAction(rightAnswer)),
});

// const mapStateToProps = () => ({
//   resultOfFetch: state.user.fetchArray[0],
// });

export default connect(null, mapDispatchToProps)(GamePage);
// https://betterprogramming.pub/building-a-simple-countdown-timer-with-react-4ca32763dda7
