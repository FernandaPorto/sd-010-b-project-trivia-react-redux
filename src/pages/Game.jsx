import React from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import TriviaGame from '../components/TriviaGame';
import Loading from '../components/Loading';
import { getQuestionsThunk } from '../redux/actions';

class Game extends React.Component {
  componentDidMount() {
    const { getQuestions, settings } = this.props;
    getQuestions({ settings });
  }

  componentWillUnmount() {
    const { gravatarURL, name, score } = this.props;

    const newRanking = {
      gravatarURL,
      name,
      score,
    };
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    ranking.push(newRanking);
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  render() {
    const { isLoading } = this.props;

    if (isLoading) return <Loading />;

    return (
      <main>
        <Header />
        <TriviaGame />
      </main>
    );
  }
}

const mapStateToProps = ({ game, player, settings }) => ({
  gravatarURL: player.gravatarURL,
  isLoading: game.isLoading,
  name: player.name,
  score: player.score,
  settings,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (payload) => dispatch(getQuestionsThunk(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
