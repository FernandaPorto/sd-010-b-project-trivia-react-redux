import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    // this.state = { };
    this.msgFeedback = this.msgFeedback.bind(this);
  }

  msgFeedback(assertions) {
    const param = 3;
    if (assertions < param) {
      return (
        <p data-testid="feedback-text">Podia ser melhor...</p>
      );
    }
    return (
      <p data-testid="feedback-text">Mandou bem!</p>
    );
  }

  render() {
    const { score, assertions } = this.props;
    return (
      <div>
        <Header />
        <div>
          <p data-testid="feedback-total-score">{`Placar final: ${score}`}</p>
          <p
            data-testid="feedback-total-question"
          >
            {`Você acertou: ${assertions} perguntas`}
          </p>
          {this.msgFeedback(assertions)}
          <Link to="/">
            <button
              type="button"
              data-testid="btn-play-again"
            >
              Jogar novamente
            </button>
          </Link>
          <Link to="/raking">
            <button
              type="button"
              data-testid="btn-ranking"
            >
              Ranking
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ player: { score, assertions } }) => ({
  score,
  assertions,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
