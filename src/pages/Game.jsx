import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';

import Questions from '../components/Questions';
import GameHeader from '../components/GameHeader';
import Timer from '../components/Timer';

const NUMBER_FIVE = 5;
let timer;

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      time: 30,
      disabled: false,
    };

    this.getQuestions = this.getQuestions.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.decreaseTime = this.decreaseTime.bind(this);
    this.timerHasMounted = this.timerHasMounted.bind(this);
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
    const correct = document.querySelector('.correct');
    const wrong = document.querySelectorAll('.wrong');

    const { count } = this.state;
    this.setState({
      count: count + 1,
      disabled: false,
      time: 30,
    },
    () => this.timerHasMounted());

    correct.style.border = null;
    wrong.forEach((answer) => {
      answer.style.border = null;
    });
  }

  decreaseTime() {
    const { time } = this.state;
    if (time > 1) {
      this.setState((prevState) => ({
        time: prevState.time - 1,
      }));
    } else {
      this.setState({
        disabled: true,
        time: 0,
      }, () => clearInterval(timer));
    }
  }

  timerHasMounted() {
    const ONE_SECOND = 1000;
    timer = setInterval(this.decreaseTime, ONE_SECOND);
  }

  render() {
    const { results, count, time, disabled } = this.state;
    const { name, gravatarEmail, score } = this.props;

    if (count === NUMBER_FIVE) {
      return (<Redirect to="/" />);
    }

    if (results) {
      return (
        <section>
          <header>
            <GameHeader name={ name } gravatarEmail={ gravatarEmail } score={ score } />
          </header>
          <main>
            <Questions result={ results[count] } disabled={ disabled } />
            <button
              type="button"
              onClick={ () => this.handleNext() }
            >
              Next
            </button>
            <Timer time={ time } hasMounted={ this.timerHasMounted } />
          </main>
        </section>

      );
    }

    return (
      <section>
        <GameHeader name={ name } gravatarEmail={ gravatarEmail } score={ score } />
        <main>
          Loading...
        </main>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const { player: { name, gravatarEmail, score } } = state;
  return { name, gravatarEmail, score };
};

Game.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
