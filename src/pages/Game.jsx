import React from 'react';
import { Redirect } from 'react-router';
// import { Redirect } from 'react-router';
import Questions from '../components/Questions';

const NUMBER_FIVE = 5;

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      // redirect: false,
    };
    this.getQuestions = this.getQuestions.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const localToken = localStorage.getItem('token');
    const { results } = await (await fetch(`https://opentdb.com/api.php?amount=5&token=${localToken}`)).json();
    this.setState({
      results,
    });
  }

  handleNext() {
    const { count } = this.state;
    this.setState({
      count: count + 1,
    });
  }

  render() {
    const { results, count } = this.state;
    console.log(results);
    if (count === NUMBER_FIVE) {
      return (<Redirect to="/" />);
    }

    if (results) {
      return (
        <div>
          <Questions result={ results[count] } />
          <button
            type="button"
            onClick={ () => this.handleNext() }
          >
            Next
          </button>
        </div>
      );
    }
    return (
      <div>
        Loading...
      </div>
    );
  }
}

export default Game;
