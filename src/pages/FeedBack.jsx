import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class FeedBack extends Component {
  render() {
    const { totalAssertions, totalScore } = this.props;
    const corrects = 3;
    return (
      <div>
        <Header />
        <h4 data-testid="feedback-text">
          { totalAssertions < corrects ? 'Podia ser melhor...' : 'Mandou bem'}
        </h4>
        <h3>Resultado Final</h3>
        <p data-testid="feedback-total-score">
          Pontuação Total:
          {totalScore}
        </p>
        <p data-testid="feedback-total-question">
          Total de Acertos:
          {totalAssertions}
        </p>

      </div>

    );
  }
}
const mapStateToProps = (state) => ({
  totalAssertions: state.player.assertions,
  totalScore: state.player.score,
});

export default connect(mapStateToProps)(FeedBack);
