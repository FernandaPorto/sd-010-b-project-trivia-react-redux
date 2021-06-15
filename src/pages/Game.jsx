import React from 'react';
import Header from '../components/Header';
import Question from '../components/Question';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  componentDidMount() {
    this.requestTrivia();
  }

  requestTrivia() {
    const token = localStorage.getItem('token');
    return fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((response) => response.json())
      .then((data) => this.setState({ results: data.results }));
  }

  render() {
    const { results } = this.state;
    // console.log(results);
    return (
      <>
        <Header />
        <Question result={ results } />
      </>
    );
  }
}

export default Game;
