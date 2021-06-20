import { getAnswers } from '../services/triviaApi';

export const ADD_GAME_DATA = 'ADD_DATA';
export const ADD_PLAYER_INFO = 'ADD_PLAYER_INFO';
export const ANSWERED = 'ANSWERED';
export const START_TIMER = 'START_TIMER';
export const DOWN_TIMER = 'DOWN_TIMER';
export const RESET_TIMER = 'RESET_TIMER';

export const setPlayerInfo = (payload) => ({ type: ADD_PLAYER_INFO, payload });
export const setGameData = (payload) => ({ type: ADD_GAME_DATA, payload });
export const isAnswered = (payload) => ({ type: ANSWERED, payload });
export const startTimer = (payload) => ({ type: START_TIMER, payload });
export const downTimer = () => ({ type: DOWN_TIMER });
export const resetTimer = () => ({ type: RESET_TIMER });
export const fetchGameData = ({ numAnswer, token }) => (dispatch) => (
  getAnswers(numAnswer, token).then((result) => dispatch(setGameData(result)))
);
