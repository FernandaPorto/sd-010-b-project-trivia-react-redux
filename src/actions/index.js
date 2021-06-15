import { getQuestions } from '../services';

export const ADD_PLAYER_NAME = 'ADD_PLAYER_NAME';
export const RECEIVE_TOKEN = 'RECEIVE_TOKEN';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';

const receiveToken = (token) => ({ type: RECEIVE_TOKEN, token });
const receiveQuestions = (questions) => ({ type: RECEIVE_QUESTIONS, questions });

export function requestAPI() {
  return async (dispatch) => {
    const request = await fetch('https://opentdb.com/api_token.php?command=request');
    const { token } = await request.json();
    localStorage.setItem('token', token);
    dispatch(receiveToken(token));
  };
}

export const saveNamePlayer = (name) => ({
  type: ADD_PLAYER_NAME,
  payload: { name },
});

export function requestQuestions() {
  return async (dispatch) => {
    const token = localStorage.getItem('token');
    const result = await getQuestions(token);
    dispatch(receiveQuestions(result));
  };
}
