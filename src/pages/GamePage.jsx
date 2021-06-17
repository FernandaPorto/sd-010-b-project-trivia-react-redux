import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
import fetchURL from '../services/API';

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
    };

    this.getToken = this.getToken.bind(this);
  }

  componentDidMount() {
    this.getToken();
  }

  async getToken() {
    const resultFetchTrivia = await setToken();
    console.log(resultFetchTrivia);
    const map = resultFetchTrivia.results
      .map((result) => result);
    this.setState({
      categories: map,
    });
  }

  render() {
    const { categories } = this.state;
    console.log(categories);
    return (
      <div>
        <Header />
        <select>
          {categories.map((item, index) => (
            <option
              data-testid="question-category"
              key={ index }
            >
              {item.category}
            </option>))}
          {categories.map((item, index) => (
            <option
              data-testid="question-text"
              key={ index }
            >
              {item.question}
            </option>))}
          {categories.map((item, index) => (
            <option
              data-testid="correct-answer"
              key={ index }
            >
              {item.correct_answer}
            </option>
          ))}
          {categories.map((item, index) => (
            <option
              data-testid={ `wrong-answer-${index}` }
              key={ index }
            >
              {item.correct_answer}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

// GamePage.propTypes = {
//   resultFetchTrivia: PropTypes.arrayOf(Object).isRequired,
// };

export default GamePage;
