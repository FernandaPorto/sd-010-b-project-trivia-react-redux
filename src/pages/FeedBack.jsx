import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { resetState } from '../action';

import '../feedback.css';

class FeedBack extends Component {
  componentDidMount() {
    const { score, name, urlAvatar, gravatarEmail } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    ranking.push({
      name,
      score,
      picture: urlAvatar,
      gravatarEmail,
    });
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  render() {
    const { score, assertions, history, reset } = this.props;

    const THREE = 3;
    return (
      <>
        <Header />
        <section className="feedback-container">
          <section className="feedback-message">
            {
              assertions >= THREE
                ? <span data-testid="feedback-text">Mandou bem!</span>
                : <span data-testid="feedback-text">Podia ser melhor...</span>
            }
            <span data-testid="feedback-total-question">
              {/* {`Você acertou ${} questões!`} */}
              {assertions}
            </span>
            <span data-testid="feedback-total-score">
              {/* {`Um total de ${score} pontos`} */}
              {score}
            </span>
          </section>
          <section className="fb-btn-container">
            <button
              type="button"
              data-testid="btn-ranking"
              onClick={ () => history.replace('/ranking') }
            >
              Ver Ranking
            </button>
            <button
              type="button"
              data-testid="btn-play-again"
              onClick={ () => {
                history.replace('/');
                reset();
              } }
            >
              Jogar novamente
            </button>
          </section>
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
  name: state.player.name,
  urlAvatar: state.player.urlAvatar,
  gravatarEmail: state.player.gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(resetState()),
});

FeedBack.propTypes = {
  score: PropTypes.number,
  assertions: PropTypes.arrayOf(PropTypes.shape),
  history: PropTypes.shape,
  reset: PropTypes.func,
  name: PropTypes.string,
  urlAvatar: PropTypes.string,
  gravatarEmail: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(FeedBack);
