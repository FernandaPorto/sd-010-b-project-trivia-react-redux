import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import GameHeader from '../components/GameHeader';
import QuestionCard from '../components/QuestionCard';

class Game extends Component {
  render() {
    const { questions } = this.props;
    if (questions) {
      return (
        <>
          <GameHeader />
          <div>Corpo da tela de jogo</div>
          {questions.map((item, i) => <QuestionCard key={ i } question={ item } />)}
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
