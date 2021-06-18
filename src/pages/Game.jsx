import React from 'react';
import Header from '../components/Header';
import Question from '../components/Question';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      numQuestion: 0,
      timer: 5,
      isDisabled: false,
    };
  }

  componentDidMount() {
    this.requestTrivia();
    this.updateTimer();
  }

  updateTimer() {
    const oneSecund = 1000;
    const changeButtons = () => { this.setState({ isDisabled: true }); };
    const { state: { timer } } = this;
    const reduceTimer = () => {
      this.state.timer <= 0 ? this.setState({ isDisabled: true }) :
      this.setState({ timer: this.state.timer - 1 });
    };
    return timer < 0 ? changeButtons() : setInterval(reduceTimer, oneSecund);
  }

  requestTrivia() {
    const token = localStorage.getItem('token');
    return fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((response) => response.json())
      .then((data) => this.setState({ results: data.results }));
  }

  render() {
    const { results, numQuestion, timer, isDisabled } = this.state;
    return (
      <>
        <Header />
        {results.map(
          (result, index) => numQuestion === index && (
            <Question result={ result } key={ numQuestion } disabled={ isDisabled } />
          ),
        )}
        <span>{timer}</span>
      </>
    );
  }
}

export default Game;
