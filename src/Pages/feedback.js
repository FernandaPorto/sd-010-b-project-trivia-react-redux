import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      again: false,
      ranking: false,
    };
    this.playAgain = this.playAgain.bind(this);
    this.seeRanking = this.seeRanking.bind(this);
    this.correctMsg = this.correctMsg.bind(this);
  }

  componentDidMount() {
  }

  correctMsg(certas) {
    const THREE = 3;
    if (certas < THREE) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  seeRanking() {
    this.setState({ ranking: true });
  }

  playAgain() {
    this.setState({ again: true });
  }

  render() {
    const { again, ranking } = this.state;
    const { certas, points } = this.props;
    const certa = this.correctMsg(certas);

    console.log(this.correctMsg);
    if (again) {
      return <Redirect to="/" />;
    } if (ranking) {
      return <Redirect to="/ranking" />;
    }
    return (
      <>
        <Header />
        {' '}
        <h1 data-testid="feedback-text">Feedback</h1>
        <h3 data-testid="feedback-text">{certa}</h3>
        <h3 data-testid="feedback-total-score">{points}</h3>
        <h3 data-testid="feedback-total-question">{Number(certas)}</h3>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.playAgain }
        >
          Jogar novamente

        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.seeRanking }
        >
          Ver Ranking

        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  certas: state.pointsReducer.correct,
  points: state.pointsReducer.points,
});
Feedback.propTypes = {
  certas: PropTypes.string,
}.isRequired;
export default connect(mapStateToProps)(Feedback);
