import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import HeaderFeedback from '../components/Header_FeedBack';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homePage: false,
      ranking: false,
    };
    this.homePageClick = this.homePageClick.bind(this);
    this.rankingClick = this.rankingClick.bind(this);
  }

  homePageClick() {
    this.setState({ homePage: true });
  }

  rankingClick() {
    this.setState({ ranking: true });
  }

  // useLocalStorage() {
  //   const { totalScore, totalAssertions } = this.props;
  //   const state = { player: {
  //     assertions: totalAssertions,

  //   } };
  //   localStorage.setItem('state', JSON.stringify(state));
  //   if (JSON.parse(localStorage.getItem('state')).length > 0) {
  //     return (JSON.parse(localStorage.getItem('state')).score);
  //   }
  // }

  render() {
    const { totalAssertions } = this.props;
    const { homePage, ranking } = this.state;
    const gotitRightQuestions = 3;
    // const finalScore = JSON.parse(localStorage.getItem('state')).score;
    // const finalAssertions = JSON.parse(localStorage.getItem('state')).assertions;
    const { player: { score } } = JSON.parse(localStorage.getItem('state'));
    const { player: { assertions } } = JSON.parse(localStorage.getItem('state'));

    return (
      <>
        <HeaderFeedback />
        {homePage ? <Redirect to="/" /> : ''}
        {ranking ? <Redirect to="/ranking" /> : ''}
        <h1>Página de FeedBacks</h1>
        <h2 data-testid="feedback-text">
          {totalAssertions < gotitRightQuestions
            ? 'Podia ser melhor...' : 'Mandou bem!'}
        </h2>
        <h3 data-testid="feedback-total-score">{score}</h3>
        {' '}
        <h4 data-testid="feedback-total-question">{assertions}</h4>
        <button
          link
          to="/"
          type="button"
          data-testid="btn-play-again"
          onClick={ this.homePageClick }
        >
          Jogar novamente
        </button>
        <button
          Link
          to="/ranking"
          type="button"
          data-testid="btn-ranking"
          onClick={ this.rankingClick }
        >
          Ver Ranking
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  totalAssertions: state.user.player.assertions,
  totalScore: state.user.player.score,
});

Feedback.propTypes = ({
  totalAssertions: PropTypes.number.isRequired,
  // totalScore: PropTypes.number.isRequired,
});

export default connect(mapStateToProps, null)(Feedback);
