import React from 'react';
import { Redirect } from 'react-router-dom';

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
    const { numberOfAssertions, location:
      { aboutProps: { name, email, score, getGravatar, correct } } } = this.props;

    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }
    const gravatar = getGravatar(name, email);
    const magicNumber = 3;
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
          <span data-testid="header-score">{`Sua pontuação: ${score}`}</span>
        </header>
        <div>
          <p data-testid="feedback-total-score">{score}</p>
          <p data-testid="feedback-total-question">{numberOfAssertions}</p>
        </div>
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
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{numberOfAssertions}</p>
      </div>
    );
  }
}

export default Feedback;
