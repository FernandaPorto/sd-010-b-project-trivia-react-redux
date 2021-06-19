import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import addInfoToLocalStorage from '../functions/addInfoToStorage';

class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      redirectRankig: false,

    };
    this.redirectToHome = this.redirectToHome.bind(this);
    this.redirectToRanking = this.redirectToRanking.bind(this);
  }

  componentDidMount() {
    const { location: { aboutProps: { email, score,
      name, numberOfAssertions } } } = this.props;
    addInfoToLocalStorage(name, email, score, numberOfAssertions);
  }

  redirectToHome() {
    this.setState({
      redirect: true,
    });
  }

  redirectToRanking() {
    this.setState({
      redirectRankig: true,
    });
  }

  render() {
    const { location:
      { aboutProps: { name, email,
        getGravatar, correct, numberOfAssertions, score } } } = this.props;
    // const InfoLocalStorage = localStorage.getItem('state');
    // const objectInfos = JSON.parse(InfoLocalStorage);
    const { redirect, redirectRankig } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }
    if (redirectRankig) {
      return (<Redirect to="ranking" />);
    }
    const gravatar = getGravatar(name, email);
    const magicNumber = 3;
    const expression = correct >= magicNumber ? `NOSSA! ${name}` : `POXA! ${name}`;
    return (
      <div>
        <header>
          {/* { addInfoToLocalStorage(name, email, score, numberOfAssertions)} */}
          <img
            data-testid="header-profile-picture"
            src={ gravatar }
            alt={ `avatar de ${name}` }
          />
          <p data-testid="header-player-name">{expression}</p>
          <p data-testid="header-score">{score}</p>
        </header>
        {correct >= magicNumber
          ? <span data-testid="feedback-text">Mandou bem!</span>
          : <span data-testid="feedback-text">Podia ser melhor...</span>}
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.redirectToHome }
        >
          Jogar novamente
        </button>
        <button
          type="button"
          onClick={ this.redirectToRanking }
          data-testid="btn-ranking"
        >
          Ver Ranking
        </button>
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{numberOfAssertions}</p>
      </div>
    );
  }
}

Feedback.propTypes = {
  location: PropTypes.shape({
    aboutProps: PropTypes.shape({
      correct: PropTypes.number,
      email: PropTypes.string,
      name: PropTypes.string,
      getGravatar: PropTypes.func,
      score: PropTypes.number,
      numberOfAssertions: PropTypes.number,
    }),
  }).isRequired,
};
export default Feedback;
