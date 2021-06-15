export const SCORE = 'SCORE';
export const LOGIN = 'LOGIN';
export const REQUEST = 'REQUEST';

const gameAction = (point) => ({
  type: SCORE,
  score: point,
});

export const requestAction = (results) => ({
  type: REQUEST,
  array: results,
});

export const loginAction = (name, email) => ({
  type: LOGIN,
  payload: {
    name,
    gravatarEmail: email,
  },
});

export default gameAction;
