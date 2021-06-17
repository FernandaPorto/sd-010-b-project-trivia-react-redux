import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../components/Header';

class FeedBack extends Component {
  render() {
    const { score, assertions, history } = this.props;

    const THREE = 3;

    return (
      <section>
        <Header />
        <section>
          {
            assertions >= THREE
              ? <span data-testid="feedback-text">Mandou bem!</span>
              : <span data-testid="feedback-text">Podia ser melhor...</span>
          }
        </section>
        <section>
          <span data-testid="feedback-total-question">
            {/* {`Você acertou ${} questões!`} */}
            {assertions}
          </span>
        </section>
        <section>
          <span data-testid="feedback-total-score">
            {/* {`Um total de ${score} pontos`} */}
            {score}
          </span>
        </section>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.replace('/') }
        >
          Jogar novamente
        </button>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

FeedBack.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.arrayOf(PropTypes.shape).isRequired,
  history: PropTypes.shape.isRequired,
};

export default connect(mapStateToProps)(FeedBack);
