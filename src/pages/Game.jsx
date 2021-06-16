import React from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Game extends React.Component {
  constructor() {
    super();

    this.getPerfilGravatar = this.getPerfilGravatar.bind(this);
    this.renderAnswers = this.renderAnswers.bind(this);
  }

  getPerfilGravatar() {
    const { location: { aboutProps: { name: { name },
      email: { email }, score: { score } } } } = this.props;
    const convert = md5(email).toString();
    const endpoint = `https://www.gravatar.com/avatar/${convert}`;

    return (
      <div>
        <img src={ endpoint } alt={ `foto de ${name}` } />
        <span data-testid="header-player-name">
          {`Bem-vindo ${name}`}
          !
        </span>
        <span data-testid="header-profile-picture">{` Email: ${email}`}</span>
        <span data-testid="header-score">{` Pontuação: ${score}`}</span>
      </div>
    );
  }

  renderAnswers() {
    const { questions } = this.props;
    return (
      <div>
        <ul>
          {
            questions.map((question, index) => {
              // Referência: https://flaviocopes.com/how-to-shuffle-array-javascript/
              const magicNumber = 0.5;
              const answers = (question.incorrect_answers
                .concat(question.correct_answer))
                .sort(() => Math.random() - magicNumber);
              console.log(question);
              const renderAnswers = answers.map((answer, index2) => {
                if (answer === question.correct_answer) {
                  return (
                    <button key={ answer } type="button" data-testid="correct-answer">
                      {answer}
                    </button>
                  );
                }
                return (
                  <button
                    key={ answer }
                    type="button"
                    data-testid={ `wrong-answer-${index2}` }
                  >
                    {answer}
                  </button>
                );
              });
              return (
                <li key={ index }>
                  <p data-testid="question-category">{question.category}</p>
                  <p data-testid="question-text">{question.question}</p>
                  {renderAnswers}
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }

  render() {
    const { questions } = this.props;
    return (
      <>
        {this.getPerfilGravatar()}
        {questions.length > 0 && this.renderAnswers()}
      </>
    );
  }
}

Game.propTypes = {
  location: PropTypes.shape({
    aboutProps: PropTypes.shape({
      name: PropTypes.shape({
        name: PropTypes.string,
      }),
      email: PropTypes.shape({
        email: PropTypes.string,
      }),
      score: PropTypes.shape({
        score: PropTypes.number,
      }),
    }),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questions.results,
});

Game.propTypes = ({
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
});
export default connect(mapStateToProps)(Game);
