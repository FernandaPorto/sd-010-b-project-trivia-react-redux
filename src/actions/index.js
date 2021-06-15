export const SET_EMAIL = 'SET_EMAIL';
export const SET_SCORE = 'SET_SCORE';
export const SET_ASSERTIONS = 'SET_ASSERTIONS';
export const SET_NAME = 'SET_NAME';
export const ADD_DATA = 'ADD_DATA';

export const setScore = (payload) => ({ type: SET_SCORE, payload });
export const setName = (payload) => ({ type: SET_NAME, payload });
export const setAssertion = (payload) => ({ type: SET_ASSERTIONS, payload });

export const setData = (payload) => ({ type: ADD_DATA, payload });
export const setEmail = (payload) => ({ type: SET_EMAIL, payload });
