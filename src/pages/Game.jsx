import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Question from '../components/Question';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      numQuestion: 0,
    };
  }

  componentDidMount() {
    this.requestTrivia();
  }

  requestTrivia() {
    const state = JSON.parse(localStorage.getItem('state'));
    return fetch(`https://opentdb.com/api.php?amount=5&token=${state.token}`)
      .then((response) => response.json())
      .then((data) => this.setState({ results: data.results }));
  }

  render() {
    const { results, numQuestion } = this.state;
    return (
      <>
        <Header />
        {results.map(
          (result, index) => numQuestion === index && (
            <Question result={ result } key={ numQuestion } />
          ),
        )}
        {/* {results.map(
          (result, index) =>{
            if(            numQuestion === index){
              return  <Question result={result} key={result.category} />
            }}
        )} */}
        <Link to="/feedback">
          Feedback
        </Link>
      </>
    );
  }
}

export default Game;
