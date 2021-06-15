export const SCORE = 'SCORE';
export const LOGIN = 'LOGIN';

const gameAction = (point) => ({
  type: SCORE,
  score: point,
});

export const loginAction = (name, email) => ({
  type: LOGIN,
  payload: {
    name,
    gravatarEmail: email,
  },
});

export default gameAction;
