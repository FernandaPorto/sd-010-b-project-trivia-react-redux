export const SCORE = 'SCORE';
export const LOGIN = 'LOGIN';
export const REQUEST = 'REQUEST';
export const REVEALED = 'REVEALED';

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

export const revealedAction = (result) => ({
  type: REVEALED,
  payload: {
    isRevealed: result,
  },
});

export default gameAction;
