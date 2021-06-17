import React from 'react';
import PropTypes from 'prop-types';

class Feedback extends React.Component {
  render() {
    const { location: { aboutProps: { name, email, score,
      getGravatar, correct } } } = this.props;
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
          <span data-testid="header-score">{`Sua pontuação: ${score}`}</span>
        </header>
        {
          correct >= magicNumber
            ? <span data-testid="feedback-text">Mandou bem!</span>
            : <span data-testid="feedback-text">Podia ser melhor...</span>
        }
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
