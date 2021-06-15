export const ACTION_TOKEN = 'ACTION_TOKEN';
export const ACTION_REDIRECT = 'ACTION_REDIRECT';
export const ACTION_QUESTIONS = 'ACTION_QUESTIONS';

const actionRedirect = () => ({
  type: ACTION_REDIRECT,
});

const actionToken = (token) => ({
  type: ACTION_TOKEN,
  token,
});

const actionQuestions = (questions) => ({
  type: ACTION_QUESTIONS,
  questions,
});

function fetchQuestionsAndAnswers(token) {
  return (dispatch) => fetch(`https://opentdb.com/api.php?amount=5&token=${token}
  `)
    .then((response) => response.json())
    .then((questions) => dispatch(actionQuestions(questions.results))); // results is the key of the object response received from API with the questions and answers
}

export function fetchToken() {
  return (dispatch) => {
    dispatch(actionRedirect());
    return fetch(`https://opentdb.com/api_token.php?command=request
  `)
      .then((response) => response.json())
      .then((response) => dispatch(actionToken(response.token))
        && dispatch(fetchQuestionsAndAnswers(response.token)))
      .then((token) => localStorage.setItem('token', JSON.stringify(token)));
  };
}
