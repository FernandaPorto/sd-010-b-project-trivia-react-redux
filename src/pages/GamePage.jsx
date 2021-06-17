import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
import fetchURL from '../services/API';
import '../App.css';

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
    };

    this.getToken = this.getToken.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    this.getToken();
  }

  async getToken() {
    const resultFetchTrivia = await setToken();
    const map = resultFetchTrivia.results
      .map((result) => result);
    this.setState({
      categories: map,
    });
  }

  handleChange() {
    this.setState((previousState) => ({ indexState: previousState.indexState + 1 }));
  }

  isLoading() {
    this.setState({ loading: true });
  }

  render() {
    const { categories, indexState, loading } = this.state;
    return (
      <div>
        <Header />
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
          <h1
            type="button"
            data-testid="question-text"
            key={ indexState }
            // onClick={ this.handleClick }
          >
            {categories[indexState].question}
          </h1>
        </section>
        <div
          role="button"
          tabIndex={ 0 }
          className={ loading ? 'correct-answer' : '' }
          onClick={ this.isLoading }
          data-testid="correct-answer"
          onKeyDown={ this.handleClick }
        >
          {categories[indexState].correct_answer}
        </div>
        {categories[indexState].incorrect_answers
        && categories[indexState].incorrect_answers.map((item, index) => (
          <div
            role="button"
            tabIndex={ 0 }
            className={ loading ? 'incorrect-answers' : '' }
            data-testid={ `wrong-answer-${index}` }
            key={ index }
          >
            {item}
          </div>
        ))}
      </div>
    );
  }
}

// GamePage.propTypes = {
//   resultFetchTrivia: PropTypes.arrayOf(Object).isRequired,
// };

export default GamePage;
