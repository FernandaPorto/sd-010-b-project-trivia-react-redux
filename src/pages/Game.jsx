import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import GameHeader from '../components/GameHeader';
import QuestionCard from '../components/QuestionCard';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      index: 0,
    };
  }

  render() {
    const { questions } = this.props;
    const { index } = this.state;
    if (questions) {
      return (
        <>
          <GameHeader />
          <QuestionCard question={ questions[index] } />
          <button
            type="button"
            onClick={ () => this.setState((prev) => ({ index: prev.index + 1 })) }
          >
            Próxima
          </button>
        </>
      );
    }
    return (
      <div>Loading...</div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.gameReducer.data.results,
});

Game.propTypes = {
  questions: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, null)(Game);
