import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Question from '../components/Question';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      // numQuestion: 0,
      // timer: 30,
      // isDisabled: false,
      // updateT: '',
    };
  }

  componentDidMount() {
    this.requestTrivia();
    // this.updateTimer();
  }

  // updateTimer() {
  //   const oneSec = 1000;
  //   const reduceTimer = () => {
  //     const { state: { timer } } = this;
  //     if (timer > 0) {
  //       this.setState((oldState) => ({ timer: oldState.timer - 1 }));
  //     } if (timer === 0) {
  //       this.setState({ isDisabled: true });
  //     }
  //   };
  //   setInterval(reduceTimer, oneSec);
  //   // this.setState({ updateT: setInterval(reduceTimer, oneSec) });
  // }

  requestTrivia() {
    const token = localStorage.getItem('token');
    return fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((response) => response.json())
      .then((data) => this.setState({ results: data.results }));
  }

  render() {
    const { results } = this.state;
    const { numQuestion } = this.props;
    return (
      <>
        <Header />
        {results.map(
          (result, index) => numQuestion === index && (
            <Question
              result={ result }
              key={ numQuestion }
              // disabled={ isDisabled }
              // timer={ timer }
            />
          ),
        )}
        {/* <span>{timer}</span> */}
      </>
    );
  }
}

Game.propTypes = {
  numQuestion: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  numQuestion: state.game.numQuestion,
});

export default connect(mapStateToProps)(Game);
