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
    const token = (localStorage.getItem('token'));
    return fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
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
