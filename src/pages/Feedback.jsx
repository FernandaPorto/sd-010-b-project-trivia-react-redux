import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  componentDidMount() {
    this.saveScore();
  }

  feedBack(assertions) {
    const NUMBER_THREE = 3;
    switch (true) {
    case (assertions < NUMBER_THREE):
      return <h2 data-testid="feedback-text">Podia ser melhor...</h2>;
    case (assertions >= NUMBER_THREE):
      return <h2 data-testid="feedback-text">Mandou bem!</h2>;
    default:
      return <h2>Error</h2>;
    }
  }

  saveScore() {
    const Rodada = JSON.parse(localStorage.getItem('state'));
    const { score, name, gravatarEmail } = Rodada.player;
    const getRanking = JSON.parse(localStorage.getItem('ranking'));
    console.log(gravatarEmail);
    let atualScore = [];
    if (getRanking) {
      atualScore = [...getRanking, { name, score, gravatarEmail }];
    } else { atualScore = [{ name, score, gravatarEmail }]; }
    const um = 1;
    const ordena = atualScore.sort((a, b) => {
      if (a.score > b.score) { return um; }
      if (a.score < b.score) { return -um; }
      return 0;
    });
    const reverse = ordena.reverse();
    const max = 5;
    localStorage.setItem('ranking', JSON.stringify(reverse.slice(0, max)));
  }

  render() {
    const { score, assertions } = this.props;
    return (
      <section>
        <Header />
        { this.feedBack(assertions) }
        <p>Acertos:</p>
        <p data-testid="feedback-total-question">
          {assertions}
          {' '}
        </p>
        <p>Pontos:</p>
        <p data-testid="feedback-total-score">
          {score}
        </p>
        <Link to="/ranking" data-testid="btn-ranking">
          <button
            type="button"
          >
            VER RANKING
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            JOGAR NOVAMENTE
          </button>
        </Link>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.score.total,
  assertions: state.assertions.total,
});

Feedback.propTypes = PropTypes.shape({
  score: PropTypes.number,
  assertions: PropTypes.number,
}).isRequired;

export default connect(mapStateToProps)(Feedback);
