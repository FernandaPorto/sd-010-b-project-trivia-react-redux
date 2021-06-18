import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import HeaderGame from '../components/HeaderGame';
import { resetScoreAction } from '../actions/scoreAction';

class FeedbackScreen extends Component {
  constructor() {
    super();

    this.state = {
      score: '',
      assertions: '',
      message: '',
      goToHome: false,
      goToRanking: false,
    };
    this.fillStorage = this.fillStorage.bind(this);
    this.goHome = this.goHome.bind(this);
    this.goRanking = this.goRanking.bind(this);
    this.updateStorage = this.updateStorage.bind(this);
  }

  componentDidMount() {
    this.fillStorage();
  }

  updateStorage() {
    const { name, score, url, resetScore } = this.props;
    const rankingObj = { name, score, picture: url };
    const storage = JSON.parse(localStorage.getItem('state'));

    storage.player.name = '';
    storage.player.assertions = 0;
    storage.player.score = '';
    storage.player.gravatarEmail = '';
    storage.ranking.push(rankingObj);
    storage.token = '';
    resetScore();
    localStorage.setItem('state', JSON.stringify(storage));
  }

  fillStorage() {
    const TRES = 3;
    let message = '';
    const storage = JSON.parse(localStorage.getItem('state'));

    if (storage.player.assertions < TRES) message = 'Podia ser melhor...';
    if (storage.player.assertions >= TRES) message = 'Mandou bem!';
    const { score, assertions } = storage.player;

    this.setState({ score, assertions, message });
  }

  goHome() { this.setState({ goToHome: true }, this.updateStorage()); }

  goRanking() { this.setState({ goToRanking: true }, this.updateStorage()); }

  render() {
    const { score, assertions, message, goToRanking, goToHome } = this.state;
    // console.log(storage.player.assertions);
    return (
      <section>
        { goToHome && <Redirect to="/" /> }
        { goToRanking && <Redirect to="/ranking" /> }

        <HeaderGame />
        <p data-testid="feedback-text">{ message }</p>
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <button
          onClick={ this.goHome }
          type="button"
          data-testid="btn-play-again"
        >
          Jogar novamente
        </button>
        <button
          onClick={ this.goRanking }
          type="button"
          data-testid="btn-ranking"
        >
          Ver Ranking
        </button>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.triviaGame.questions,
  name: state.triviaGame.name,
  score: state.triviaGame.score,
  url: state.triviaGame.url,
});

const mapDispatchToProps = (dispatch) => ({
  resetScore: () => dispatch(resetScoreAction()),
});

FeedbackScreen.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  resetScore: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackScreen);
