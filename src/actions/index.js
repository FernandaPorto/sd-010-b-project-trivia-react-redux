import { getAnswers } from '../services/triviaApi';

export const ADD_GAME_DATA = 'ADD_DATA';
export const ADD_PLAYER_INFO = 'ADD_PLAYER_INFO';
export const SET_NEXT_QST = 'SET_NEXT_BTN';
export const ADD_SCORE = 'ADD_SCORE';

export const setPlayerInfo = (payload) => ({ type: ADD_PLAYER_INFO, payload });
export const setGameData = (payload) => ({ type: ADD_GAME_DATA, payload });
export const setNextQst = () => ({ type: SET_NEXT_QST });
export const addScore = (payload) => ({ type: ADD_SCORE, payload });

export const fetchGameData = ({ numAnswer, token }) => (dispatch) => (
  getAnswers(numAnswer, token).then((result) => dispatch(setGameData(result)))
);
