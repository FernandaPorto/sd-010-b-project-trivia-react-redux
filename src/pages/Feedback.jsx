import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends React.Component {
  feedbackMessage() {
    const { assertions, score } = this.props;
    let message = 'Mandou bem!';
    if (assertions <= 2) {
      message = 'Podia ser melhor...';
    }
    return <p data-testid="feedback-text">{ message }</p>;
  }

  render() {
    return (
      <main>
        <HeaderFeedback />
        <section>
          <p data-testid="feedback-text">{ feedbackMessage() }</p>
          <div>
            <span>Número de acertos: </span>
            <span data-testid="feedback-total-question">{assertions}</span>
          </div>
          <div>
            <span>Pontuação final: </span>
            <span data-testid="feedback-total-score">{score}</span>
          </div>
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
