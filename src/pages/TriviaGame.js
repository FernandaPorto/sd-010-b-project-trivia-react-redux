import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { getTrivia } from '../actions';
import GameHeader from '../components/GameHeader';
import Questions from '../components/Questions';

class TriviaGame extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      next: false,
    };
    this.updateIndex = this.updateIndex.bind(this);
    this.nextAnswer = this.nextAnswer.bind(this);
  }

  componentDidMount() {
    const { token, updateTrivia } = this.props;
    updateTrivia(token);
  }

  nextAnswer(bool) {
    this.setState({ next: bool });
  }

  updateIndex() {
    this.setState((prev) => ({ index: prev.index + 1 }));
  }

  render() {
    const { index, next, childUnmount } = this.state;
    const { isFetching, questions } = this.props;
    const quant = 5;
    if (isFetching) return 'Loading...';
    if (index >= quant) return <Redirect to="/feedback" />;
    return (
      <div>
        <GameHeader />
        {!childUnmount ? <Questions
          { ...questions[index] }
          nextAnswer={ this.nextAnswer }
          next={ next }
          key={ `answer - ${index}` }
        /> : null}
        {next && (
          <button
            data-testid="btn-next"
            type="button"
            onClick={ () => this.updateIndex() }
          >
            Próximo
          </button>
        )}
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
