import React, { Component } from 'react';
import '../GamePageCss.css';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
import fetchURL from '../services/API';
import ButtonNextQuestion from '../components/ButtonNextQuestion';
import ButtonFeedback from '../components/ButtonFeedback';
import ButtonLogin from '../components/ButtonLogin';

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
      seconds: 35,
      rightAnswer: true,
    };

    this.getToken = this.getToken.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.isLoading = this.isLoading.bind(this);
    this.interval = this.interval.bind(this);
    this.questionAndAnswer = this.questionAndAnswer.bind(this);
    this.correctAnswer = this.correctAnswer.bind(this);
    this.wrongAnswer = this.wrongAnswer.bind(this);
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
    this.myInterval = setInterval(() => {
      const { seconds } = this.state;
      if (seconds > 0) {
        this.setState((previousState) => ({
          seconds: previousState.seconds - 1,
        }));
      }
      if (seconds === 0) {
        this.isLoading();
      }
    }, A_SECOND);
  }

  handleChange() {
    this.setState((previousState) => ({ indexState: previousState.indexState + 1 }));
  }

  correctAnswer() {
    this.setState({ loading: true });
    this.setState({ rightAnswer: false });
  }

  wrongAnswer() {
    this.setState({ loading: true });
  }

  questionAndAnswer() {
    const { categories, indexState, loading } = this.state;
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
          onKeyDown={ this.correctAnswer }
          onClick={ this.correctAnswer }
        >
          {categories[indexState].correct_answer}
        </option>
        {categories[indexState].incorrect_answers
        && categories[indexState].incorrect_answers.map((item, index) => (
          <option
            className={ loading ? 'incorrect-answers' : '' }
            onClick={ this.wrongAnswer }
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
    const { seconds, rightAnswer } = this.state;
    return (
      <div>
        <Header />
        { this.questionAndAnswer() }
        { seconds > 0 ? `${seconds}` : '' }
        <ButtonFeedback />
        <ButtonLogin />
        <ButtonNextQuestion
          rightAnswer={ rightAnswer }
          handleChange={ this
            .handleChange }
        />
      </div>
    );
  }
}

// GamePage.propTypes = {
//   resultFetchTrivia: PropTypes.arrayOf(Object).isRequired,
// };

export default GamePage;
// https://betterprogramming.pub/building-a-simple-countdown-timer-with-react-4ca32763dda7
