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

  render() {
    const { totalAssertions, totalScore } = this.props;
    const { homePage, ranking } = this.state;
    const gotitRightQuestions = 3;

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
        <h3 data-testid="feedback-total-score">{totalScore}</h3>
        <h4 data-testid="feedback-total-question">{totalAssertions}</h4>
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
  totalScore: PropTypes.number.isRequired,
});

export default connect(mapStateToProps, null)(Feedback);
