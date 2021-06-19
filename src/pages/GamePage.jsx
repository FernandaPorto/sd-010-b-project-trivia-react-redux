import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchURL from '../services/API';
import Header from '../components/Header';
import ButtonNextQuestion from '../components/ButtonNextQuestion';
import ButtonFeedback from '../components/ButtonFeedback';
import ButtonLogin from '../components/ButtonLogin';
import { scoreAction } from '../actions';
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
    };

    this.getToken = this.getToken.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.interval = this.interval.bind(this);
    this.questionAndAnswer = this.questionAndAnswer.bind(this);
    this.correctAnswer = this.correctAnswer.bind(this);
    this.wrongAnswer = this.wrongAnswer.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    console.log('foi chamado');
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

  handleChange() {
    const { indexState, categories } = this.state;
    const maxQuestionsNumber = 6;
    if (indexState < maxQuestionsNumber) {
      return categories[indexState].question;
    }
    this.setState((previousState) => ({ indexState: previousState.indexState + 1 }));
  }

  correctAnswer() {
    const { categories, indexState, seconds } = this.state;
    const { playerScore } = this.props;
    const level = categories[indexState].difficulty;
    const hard = 3;
    const standardNumber = 10;
    if (level === 'easy') {
      playerScore(standardNumber + seconds);
    } else if (level === 'medium') {
      playerScore(standardNumber + (seconds * 2));
    } else {
      playerScore(standardNumber + (seconds * hard));
    }
    this.setState({ loading: true });
    this.setState({ answered: false });
    this.setState({ button: true });
    localStorage.setItem('score', JSON.stringify(playerScore));
    this.componentWillUnmount();
  }

  wrongAnswer() {
    this.setState({ loading: true });
    this.setState({ answered: false });
    this.setState({ button: true });
    this.componentWillUnmount();
  }

  nextQuestion() {
    this.setState({ loading: false });
    this.setState({ answered: true });
  }

  questionAndAnswer() {
    const { categories, indexState, loading, timeIsOut } = this.state;
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
            onClick={ this.handleChange }
            onKeyDown={ this.handleChange }
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
          {categories[indexState].correct_answer}
        </option>
        {categories[indexState].incorrect_answers
        && categories[indexState].incorrect_answers.map((item, index) => (
          <option
            className={ loading ? 'incorrect-answers' : '' }
            onClick={ timeIsOut ? '' : this.wrongAnswer }
            data-testid={ `wrong-answer-${index}` }
            key={ index }
          >
            {item}
          </option>
        ))}
      </div>
    );
  }

  render() {
    const { seconds, answered, button, loading } = this.state;
    return (
      <div className="App">
        <Header />
        <div className="Gamepage">
          { this.questionAndAnswer() }
        </div>
        <div className="Buttons">
          { seconds > 0 ? `Timer:${seconds}` : '' }
          <ButtonLogin />
          <ButtonFeedback />
          {console.log(loading)}
          { button ? <ButtonNextQuestion
            answered={ answered }
            handleChange={ this.handleChange }
            nextQuestion={ this.nextQuestion }
            interval={ this.interval }
          />
            : ''}
        </div>
      </div>
    );
  }
}

GamePage.propTypes = {
  playerScore: PropTypes.func.isRequired,
  // totalScore: PropTypes.number.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  playerScore: (score) => dispatch(scoreAction([score])),
});

const mapStateToProps = () => ({
  // totalScore: state.user.userScore,
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
// https://betterprogramming.pub/building-a-simple-countdown-timer-with-react-4ca32763dda7
