import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import fetchURL from '../services/API';

export const setToken = async () => {
  try {
    const token = await fetchURL();
    localStorage.setItem('token', JSON.stringify(token));
    const fetchTrivia = await fetch(`https://opentdb.com/api.php?amount=5&token=${token.token}`);
    const resposta = await fetchTrivia.json();
    const result = await resposta;
    return result;
  } catch (error) {
    console.error(error);
  }
};

class GamePage extends Component {
  componentDidMount() {
    this.getToken();
  }

  async getToken() {
    const resultFetchTrivia = await setToken();
    console.log(resultFetchTrivia);
  }

  render() {
    const { results } = this.props;
    return (
      <div>
        <Header />
        {results.map((result) => <div key={ result.type }>{result.category}</div>)}
      </div>
    );
  }
}

GamePage.propTypes = {
  results: PropTypes.arrayOf(Object).isRequired,
};

export default GamePage;
