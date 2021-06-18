import { getQuestions } from '../services';
import {
  ADD_SCORE, GET_SECONDS, RECEIVE_QUESTIONS, RECEIVE_TOKEN, TOGGLE_CRONOMETER,
} from './actionsType';

const saveToken = (token) => ({ type: RECEIVE_TOKEN, token });

const receiveQuestions = (questions) => ({ type: RECEIVE_QUESTIONS, questions });

export const requestAPI = () => async () => {
  const request = await fetch('https://opentdb.com/api_token.php?command=request');
  const { token } = await request.json();
  localStorage.setItem('token', token);
};

export const receiveToken = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(saveToken(token));
};

export const requestQuestions = (token) => async (dispatch) => {
  const result = await getQuestions(token);
  dispatch(receiveQuestions(result));
};

export const increaseScore = (score) => ({
  type: ADD_SCORE,
  score,
});

export const toggleStatusCronometer = (status) => ({
  type: TOGGLE_CRONOMETER,
  status,
});

export const receiveSeconds = (seconds) => ({
  type: GET_SECONDS,
  seconds,
});
