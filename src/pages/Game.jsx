import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';

import Questions from '../components/Questions';
import GameHeader from '../components/GameHeader';

const NUMBER_FIVE = 5;

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
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
    const { name, imgPath, score } = this.props;

    if (count === NUMBER_FIVE) {
      return (<Redirect to="/" />);
    }

    if (results) {
      return (
        <section>
          <GameHeader name={ name } imgPath={ imgPath } score={ score } />
          <main>
            <Questions result={ results[count] } />
            <button
              type="button"
              onClick={ () => this.handleNext() }
            >
              Next
            </button>
          </main>
        </section>

      );
    }

    return (
      <section>
        <GameHeader name={ name } imgPath={ imgPath } score={ score } />
        <main>
          Loading...
        </main>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const { player: { name, imgPath, score } } = state;
  return { name, imgPath, score };
};

Game.propTypes = {
  name: PropTypes.string.isRequired,
  imgPath: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
