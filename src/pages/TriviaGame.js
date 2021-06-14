import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTrivia } from '../actions';
import GameHeader from '../components/GameHeader';
import Questions from '../components/Questions';

class TriviaGame extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
    };
  }

  componentDidMount() {
    const { token, updateTrivia } = this.props;
    updateTrivia(localStorage.token);
  }

  render() {
    const { index } = this.state;
    const { isFetching, questions } = this.props;
    if (isFetching) return 'Loading...';
    return (
      <div>
        <GameHeader />
        <Questions { ...questions[index] } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  questions: state.trivia.results,
  isFetching: state.trivia.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  updateTrivia: (token) => dispatch(getTrivia(token)),
});

TriviaGame.propTypes = {
  token: PropTypes.string,
  questions: PropTypes.arrayOf(PropTypes.object),
  isFetching: PropTypes.bool,
  updateTrivia: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(TriviaGame);
