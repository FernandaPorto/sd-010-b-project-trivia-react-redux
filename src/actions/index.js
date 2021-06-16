export const ADD_DATA = 'ADD_DATA';
export const ADD_PLAYER_INFO = 'ADD_PLAYER_INFO';

export const setPlayerInfo = (payload) => ({ type: ADD_PLAYER_INFO, payload });
export const setData = (payload) => ({ type: ADD_DATA, payload });
