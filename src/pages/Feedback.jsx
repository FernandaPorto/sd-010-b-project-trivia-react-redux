import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  endingMessage() {
    const { totalAssertions } = this.props;
    const gotitRightQuestions = 3;
    if (totalAssertions < gotitRightQuestions) {
      return 'Podia ser melhor...';
    } return 'Mandou bem!';
  }

  render() {
    const { eachPoints } = this.props;
    return (
      <>
        <Header />
        <h1 data-testid="feedback-text">Página de FeedBacks</h1>
        {this.endingMessage()}
        <Link to="/">
          Voltar
          {eachPoints}
        </Link>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  totalAssertions: state.user.player.assertions,
  eachPoints: state.user.player.eachScore,
});

Feedback.propTypes = ({
  totalAssertions: PropTypes.number.isRequired,
  eachPoints: PropTypes.number.isRequired,
});

export default connect(mapStateToProps, null)(Feedback);
