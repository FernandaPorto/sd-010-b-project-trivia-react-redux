import {
  requestApi,
  receiveToken,
  receiveQuestions,
} from '../actions/index';

export function fetchToken() {
  return async (dispatch) => {
    dispatch(requestApi());
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    return dispatch(receiveToken(data.token), localStorage.setItem('token', data.token));
  };
}

export function fetchQuestions(token) {
  return async (dispatch) => {
    dispatch(requestApi());
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const questions = await response.json();
    return dispatch(receiveQuestions(questions));
  };
}
