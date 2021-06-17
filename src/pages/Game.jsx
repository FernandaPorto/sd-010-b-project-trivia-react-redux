import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import GameHeader from '../components/GameHeader';
import QuestionCard from '../components/QuestionCard';

class Game extends Component {
  render() {
    const { questions, current } = this.props;
    if (questions) {
      return (
        <>
          <GameHeader />
          <QuestionCard question={ questions[current] } />
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
  current: state.gameReducer.current,
});

Game.propTypes = {
  questions: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, null)(Game);
