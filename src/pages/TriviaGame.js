import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTrivia } from '../actions';
import GameHeader from '../components/GameHeader';

class TriviaGame extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
    };
  }

  componentDidMount() {
    getTrivia();
  }

  render() {
    const { questions, isFetching } = this.props;
    if (isFetching) return <p>Loading...</p>;
    console.log(questions);
    return (
      <div>
        <GameHeader />
      </div>
    );
  }
}

const mapStateToProps = ({ trivia: { results, isFetching } }) => ({
  questions: results,
  isFetching,
});

export default connect(mapStateToProps)(TriviaGame);
