import React from 'react';
import { Redirect } from 'react-router-dom';

function nextButton(state, props, nextQuestion, getGravatar) {
  const { clicked, numberQuestion } = state;
  const { questions } = props;
  if (numberQuestion < questions.length - 1 && clicked) {
    return (
      <div>
        <button
          data-testid="btn-next"
          onClick={ nextQuestion }
          type="button"
        >
          Próxima
        </button>
      </div>
    );
  }
  if (numberQuestion === questions.length - 1 && clicked) {
    const { score, correct, numberOfAssertions } = state;
    const { location: { aboutProps: { name: { name },
      email: { email } } } } = props;
    return (
      <div>
        <button data-testid="btn-next" disabled type="button">
          <Redirect
            to={ {
              pathname: '/feedback',
              aboutProps: { email,
                name,
                getGravatar,
                score,
                correct,
                numberOfAssertions,
              },
            } }
          />
          Próxima
        </button>
      </div>
    );
  }
}

export default nextButton;
