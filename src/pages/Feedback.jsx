import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { assertions, score } = this.props;
    return (
      <main>
        <Header />
        <section>
          <p>{ assertions <= 2 ? 'Podia ser melhor...' : 'Mandou bem!'}</p>
          <div>
            <span>Número de acertos: </span>
            <span>{assertions}</span>
          </div>
          <div>
            <span>Pontuação final: </span>
            <span>{score}</span>
          </div>
          <button type="button">
            <Link to="/">Jogar novamente</Link>
          </button>
          <button type="button">
            <Link to="/ranking">Ranking</Link>
          </button>
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
