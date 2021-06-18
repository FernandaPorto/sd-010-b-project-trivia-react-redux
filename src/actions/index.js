export const REQUEST_API = 'REQUEST_API';
export const SAVE_NAME = 'SAVE_NAME';
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_ASSERTIONS = 'SAVE_ASSERTIONS';
export const REQUEST_QUESTIONS = 'REQUEST_API_QUESTIONS';
export const SAVE_GRAVATAR = 'SAVE_GRAVATAR';
export const SAVE_SCORE = 'SAVE_SCORE';

export const requestAPI = (result) => ({ type: REQUEST_API, result });
export const saveName = (name) => ({ type: SAVE_NAME, name });
export const saveEmail = (email) => ({ type: SAVE_EMAIL, email });
export const saveAssertions = (acertos) => ({ type: SAVE_ASSERTIONS, acertos });
export const saveGravatar = (gravatar) => ({ type: SAVE_GRAVATAR, gravatar });
export const saveScore = (score) => ({ type: SAVE_SCORE, score });
export const requestQuestions = (questions) => ({ type: REQUEST_QUESTIONS, questions });

export function fetchAPI() {
  return async (dispatch) => {
    const result = await fetch('https://opentdb.com/api_token.php?command=request');
    const resultJson = await result.json();
    return dispatch(requestAPI(resultJson));
  };
}

export function fetchApiQuestions(token, nPerguntas) {
  return async (dispatch) => {
    const result = await fetch(`https://opentdb.com/api.php?amount=${nPerguntas}&token=${token}`);
    const resultJson = await result.json();
    return dispatch(requestQuestions(resultJson));
  };
}
