export const REQUEST_API = 'REQUEST_API';
export const SAVE_NAME = 'SAVE_NAME';
export const REQUEST_QUESTIONS = 'REQUEST_API_QUESTIONS';

export const requestAPI = (result) => ({ type: REQUEST_API, result });
export const saveName = (name) => ({ type: SAVE_NAME, name });
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
