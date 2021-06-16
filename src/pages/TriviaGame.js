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
      childUnmount: false,
    };
    this.updateIndex = this.updateIndex.bind(this);
    this.nextAnswer = this.nextAnswer.bind(this);
    this.childMount = this.childMount.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  componentDidMount() {
    const { token, updateTrivia } = this.props;
    updateTrivia(token);
  }

  componentWillUnmount() {
    clearTimeout(this.cronometerInterval);
  }

  childMount(bool) {
    this.setState({ childUnmount: bool });
  }

  handleNext() {
    const seconds = 300;
    this.updateIndex();
    this.cronometerInterval = setTimeout(() => {
      this.childMount(false);
    }, seconds);
    this.childMount(true);
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
        /> : null}
        {next && (
          <button
            data-testid="btn-next"
            type="button"
            onClick={ this.handleNext }
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
