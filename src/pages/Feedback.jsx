import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
    this.redirectToHome = this.redirectToHome.bind(this);
  }

  redirectToHome() {
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { location:
      { aboutProps: { name, email,
        getGravatar, correct, numberOfAssertions } } } = this.props;

    const InfoLocalStorage = localStorage.getItem('state');
    const objectInfos = JSON.parse(InfoLocalStorage);

    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }
    const gravatar = getGravatar(name, email);
    const magicNumber = 3;
    console.log(this.props);
    const expression = correct >= magicNumber ? `NOSSA! ${name}` : `POXA! ${name}`;
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ gravatar }
            alt={ `avatar de ${name}` }
          />
          <span data-testid="header-player-name">{expression}</span>
          <span data-testid="header-score">{Number(objectInfos.player.score)}</span>
        </header>

        {
          correct >= magicNumber
            ? <span data-testid="feedback-text">Mandou bem!</span>
            : <span data-testid="feedback-text">Podia ser melhor...</span>
        }
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.redirectToHome }
        >
          Jogar novamente
        </button>
        <p data-testid="feedback-total-score">{Number(objectInfos.player.score)}</p>
        <p data-testid="feedback-total-question">{numberOfAssertions}</p>
      </div>
    );
  }
}

// console.log(name,email,score,getGravatar,correct)
Feedback.propTypes = {
  location: PropTypes.shape({
    aboutProps: PropTypes.shape({
      correct: PropTypes.number,
      email: PropTypes.string,
      name: PropTypes.string,
      getGravatar: PropTypes.func,
      score: PropTypes.number,
    }),
  }).isRequired,
};
export default Feedback;
