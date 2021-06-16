import { getQuestions } from '../services';
import { ADD_PLAYER_NAME, RECEIVE_QUESTIONS, RECEIVE_TOKEN } from './actionsType';

const saveToken = (token) => ({ type: RECEIVE_TOKEN, token });

const receiveQuestions = (questions) => ({ type: RECEIVE_QUESTIONS, questions });

export const requestAPI = () => async () => {
  const request = await fetch('https://opentdb.com/api_token.php?command=request');
  const { token } = await request.json();
  localStorage.setItem('token', token);
};

export const saveNamePlayer = (name) => ({
  type: ADD_PLAYER_NAME,
  payload: { name },
});

export const receiveToken = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(saveToken(token));
};

export const requestQuestions = (token) => async (dispatch) => {
  const result = await getQuestions(token);
  dispatch(receiveQuestions(result));
};
